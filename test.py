# Databricks notebook source

from mlflow.types.agent import ChatAgentMessage

import agents

def main():
    p = agents.AGENT.predict(
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

# import mlflow
# from mlflow.models.resources import DatabricksServingEndpoint

# from agents import LLM_ENDPOINT_NAME

# with mlflow.start_run():
#     logged_agent_info = mlflow.pyfunc.log_model(
#         artifact_path="agent",
#         python_model="agent.py",
#         pip_requirements=[
#             "mlflow",
#             "dspy",
#             "databricks-sdk",
#         ],
#         resources=[DatabricksServingEndpoint(endpoint_name=LLM_ENDPOINT_NAME)],
#     )



