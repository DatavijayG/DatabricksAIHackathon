import os
import uuid
from dataclasses import dataclass
from textwrap import dedent
from typing import Any

import mlflow
import mlflow.models
import nest_asyncio
from mlflow.entities import SpanType
from mlflow.pyfunc.model import ChatAgent
from mlflow.types.agent import ChatAgentMessage, ChatAgentResponse, ChatContext
from pydantic import BaseModel, Field, Json
from pydantic_ai import Agent, RunContext
from pydantic_ai.messages import ModelMessage
from pydantic_ai.models.openai import OpenAIModel
from pydantic_ai.providers.openai import OpenAIProvider
from pydantic_ai.settings import ModelSettings
from pydantic_evals import Case, Dataset
from pydantic_evals.evaluators import LLMJudge, OutputConfig

from databricks.sdk import WorkspaceClient

HOST = "https://dbc-603a79e2-9d02.cloud.databricks.com"
BASE_URL = "https://dbc-603a79e2-9d02.cloud.databricks.com/serving-endpoints"
MODEL_NAME = "databricks-meta-llama-3-3-70b-instruct"


@dataclass
class MapPin:
    name: str
    latitude: float
    longitude: float


@dataclass
class MapState:
    pins: list[MapPin]


@dataclass
class Memory:
    genie_response: str


class PydanticChatAgent(ChatAgent):
    supervisor: Agent
    api_key: str

    def __init__(self, databricks_token: str):
        api_key = databricks_token

        PROVIDER = OpenAIProvider(
            base_url=BASE_URL,
            api_key=databricks_token,
        )

        MODEL = OpenAIModel(model_name=MODEL_NAME, provider=PROVIDER)

        self.supervisor = Agent(
            model=MODEL,
            model_settings=ModelSettings(temperature=0.0),
            output_type=str,
            deps_type=Memory,
            retries=3,
        )

        @self.supervisor.tool
        async def query_genie(ctx: RunContext[Memory], inquiry: str) -> str:
            w = WorkspaceClient(host=HOST, token=api_key)

            space_id = "01f0454e56621eba8a7c7244630a8f70"

            genie_message = w.genie.start_conversation_and_wait(
                space_id=space_id, content=inquiry
            )

            if genie_message.attachments:
                first_attachment_id = genie_message.attachments[0].attachment_id
                if first_attachment_id:
                    result = w.genie.get_message_query_result_by_attachment(
                        space_id=space_id,
                        conversation_id=genie_message.conversation_id,
                        message_id=genie_message.message_id,
                        attachment_id=first_attachment_id,
                    )
                    ctx.deps.genie_response = str(result)
                    return str(result)
                else:
                    return "Genie response does not contain an attachment."
            else:
                return "Genie response does not contain any attachments."

        self.map_pin_extractor = Agent(
            model=MODEL,
            model_settings=ModelSettings(temperature=0.0),
            output_type=MapState,
            deps_type=Memory,
            retries=3,
        )

        @self.supervisor.tool
        async def extract_map_pins(ctx: RunContext[Memory]) -> MapState:
            pins = self.map_pin_extractor.run_sync(
                user_prompt="Extract map pins from the Genie response",
                deps=ctx.deps,
            ).output
            return pins

    @mlflow.trace(span_type=SpanType.AGENT)
    def predict(
        self,
        messages: list[ChatAgentMessage],
        context: ChatContext | None = None,
        custom_inputs: dict[str, Any] | None = None,
    ) -> ChatAgentResponse:
        user_prompt = messages[-1].content

        nest_asyncio.apply()

        result = self.supervisor.run_sync(user_prompt=user_prompt)

        response = ChatAgentResponse(
            messages=[
                ChatAgentMessage(
                    role="assistant", content=result.output, id=str(uuid.uuid4())
                )
            ],
            custom_outputs={
                "map_state": MapState(
                    pins=[
                        MapPin(name="Eiffel Tower", latitude=48.8584, longitude=2.2945),
                        MapPin(
                            name="Louvre Museum", latitude=48.8606, longitude=2.3376
                        ),
                    ]
                )
            },
        )

        return response


AGENT = PydanticChatAgent(databricks_token=os.environ["DATABRICKS_TOKEN"])
mlflow.models.set_model(AGENT)
