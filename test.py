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
import os

def main():
    a = agents.PydanticChatAgent(os.environ["DATABRICKS_TOKEN"])
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



# COMMAND ----------

main()

# COMMAND ----------


