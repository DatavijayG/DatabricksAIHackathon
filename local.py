from mlflow.types.agent import ChatAgentMessage

from agents import AGENT


def main():
    p = AGENT.predict(
        messages=[
            ChatAgentMessage(
                role="user",
                content="What is the capital of France?",
            )
        ]
    )

    print(p)
