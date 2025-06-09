# Databricks notebook source
# MAGIC %pip install "databricks-agents>=0.22.1"
# MAGIC %pip install "mlflow[databricks]>=2.22.1"
# MAGIC %pip install "pydantic-ai>=0.2.16"

# COMMAND ----------

dbutils.library.restartPython()

# COMMAND ----------

import nest_asyncio
nest_asyncio.apply()

# COMMAND ----------

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


# COMMAND ----------

main()

# COMMAND ----------


