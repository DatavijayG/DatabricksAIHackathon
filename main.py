import uuid
from mlflow.pyfunc.model import ChatAgent
from pydantic_ai.agent import Agent
from pydantic_ai.providers.openai import OpenAIProvider
from pydantic_ai.models.openai import OpenAIModel
from pydantic_ai.settings import ModelSettings
from pydantic_ai.messages import ModelMessage
from mlflow.types.agent import ChatAgentMessage, ChatContext, ChatAgentResponse
import os
from typing import Optional, Any

BASE_URL = "https://dbc-603a79e2-9d02.cloud.databricks.com/serving-endpoints"
MODEL_NAME = "databricks-meta-llama-3-3-70b-instruct"


DATABRICKS_TOKEN = os.environ.get("DATABRICKS_TOKEN")

provider = OpenAIProvider(
    base_url=BASE_URL,
    api_key=DATABRICKS_TOKEN,
)

model = OpenAIModel(model_name=MODEL_NAME, provider=provider)


class PydanticChatAgent(ChatAgent):
    supervisor: Agent

    def __init__(self):
        self.supervisor = Agent(
            model=model,
            model_settings=ModelSettings(temperature=0.0),
            # deps_type
            output_type=str,
            retries=3,
        )

    # def predict(
    #         self,
    #         messages: list[ChatAgentMessage],
    #         #context: Optional[ChatContext] = None,
    #         custom_inputs: Optional[dict[str, Any]] = None,
    #     ) -> ChatAgentResponse

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
        )

        return response


def main():
    a = PydanticChatAgent()
    p = a.predict(
        messages=[
            ChatAgentMessage(
                role="user",
                content="What is the capital of France?",
            )
        ]
    )
    print(p)


if __name__ == "__main__":
    main()
