import os
import uuid
from dataclasses import dataclass
from typing import Any

import mlflow
from mlflow.entities import SpanType
from mlflow.models import set_model
from mlflow.pyfunc.model import ChatAgent
from mlflow.types.agent import ChatAgentMessage, ChatAgentResponse, ChatContext
from pydantic_ai.agent import Agent
from pydantic_ai.models.openai import OpenAIModel
from pydantic_ai.providers.openai import OpenAIProvider
from pydantic_ai.settings import ModelSettings

BASE_URL = "https://dbc-603a79e2-9d02.cloud.databricks.com/serving-endpoints"
DATABRICKS_TOKEN = os.environ.get("DATABRICKS_TOKEN")

PROVIDER = OpenAIProvider(
    base_url=BASE_URL,
    api_key=DATABRICKS_TOKEN,
)

MODEL_NAME = "databricks-meta-llama-3-3-70b-instruct"

MODEL = OpenAIModel(model_name=MODEL_NAME, provider=PROVIDER)


@dataclass
class MapPin:
    name: str
    latitude: float
    longitude: float


@dataclass
class MapState:
    pins: list[MapPin]


class PydanticChatAgent(ChatAgent):
    supervisor: Agent

    def __init__(self):
        self.supervisor = Agent(
            model=MODEL,
            model_settings=ModelSettings(temperature=0.0),
            output_type=str,
            retries=3,
        )

    # def prepare_message_history(self, messages: list[ChatAgentMessage]):
    #     history_entries = []
    #     # Assume the last message in the input is the most recent user question.
    #     for i in range(0, len(messages) - 1, 2):
    #         history_entries.append({"question": messages[i].content, "answer": messages[i + 1].content})
    #     return dspy.History(messages=history_entries)

    @mlflow.trace(span_type=SpanType.AGENT)
    def predict(
        self,
        messages: list[ChatAgentMessage],
        context: ChatContext | None = None,
        custom_inputs: dict[str, Any] | None = None,
    ) -> ChatAgentResponse:
        last_message = messages[-1]
        user_prompt = last_message.content

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


# Set model for logging or interactive testing
AGENT = PydanticChatAgent()
set_model(AGENT)
