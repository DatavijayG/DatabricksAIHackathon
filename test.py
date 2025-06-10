# Databricks notebook source
# MAGIC %pip install "databricks-agents>=0.22.1"
# MAGIC %pip install "mlflow[databricks]>=2.22.1"
# MAGIC %pip install "pydantic-ai>=0.2.16"
# MAGIC %pip install "uv"

# COMMAND ----------

dbutils.library.restartPython()

# COMMAND ----------

import nest_asyncio
nest_asyncio.apply()

# COMMAND ----------

import os
os.environ["DATABRICKS_TOKEN"] = dbutils.secrets.get("Secrets", "DATABRICKS_TOKEN")

# COMMAND ----------

import mlflow
from agents import MODEL_NAME
from mlflow import set_registry_uri
from mlflow.models.resources import DatabricksServingEndpoint

set_registry_uri("databricks-uc")

with mlflow.start_run():
    logged_agent_info = mlflow.pyfunc.log_model(
        artifact_path="agents",
        python_model="agents.py",
        pip_requirements=[
            "databricks-agents>=0.22.1",
            "mlflow[databricks]>=2.22.1",
            "pydantic-ai>=0.2.16",
            "nest-asyncio",
            "databricks-sdk"
        ],
        resources=[DatabricksServingEndpoint(endpoint_name=MODEL_NAME)],
        registered_model_name="silver.default.supervisor",
        input_example={
            "messages": [
                {
                    "role": "user",
                    "content": "What is the closest pet-friendly hotel to the White House at 38.8977° N, 77.0365° W?",
                }
            ]
        },
    )

# COMMAND ----------

mlflow.models.predict(
    model_uri=f"runs:/{logged_agent_info.run_id}/agents",
    input_data={
            "messages": [
                {
                    "role": "user",
                    "content": "What is the closest pet-friendly hotel to the White House at 38.8977° N, 77.0365° W?",
                }
            ]
        },
    env_manager="uv",
)

# COMMAND ----------

from databricks import agents

agents.deploy("silver.default.supervisor", logged_agent_info.registered_model_version, tags={"endpointSource": "docs"})

# COMMAND ----------


