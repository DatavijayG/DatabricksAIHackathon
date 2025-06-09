from mlflow.types.agent import ChatAgentMessage
import agents
import os

def main():
    a = agents.PydanticChatAgent(os.environ["DATABRICKS_TOKEN"])
    p = a.predict(
        messages=[
            ChatAgentMessage(
                role="user",
                content="What is the closest pet-friendly hotel to the Eiffel Tower at 48.858093, 2.294694?",
            )
        ]
    )

    print(p)


if __name__ == "__main__":
    main()
