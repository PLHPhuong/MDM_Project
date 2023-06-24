const { Client } = require("cassandra-driver");

let client = null;
const connectCassandra = async () => {
  try {
    client = new Client({
      cloud: { secureConnectBundle: "./secure-connect-mydatabase.zip" },
      credentials: {
        username: "QUntLDogdEWrqAOOYASDbJXk",
        password:
          "PRQafe9lZzfUfWdaNeDrK4J2J3nDfck7xd2oFj.jF9ZCcPhSv-3WzLf3TjBH4M1Tf5YgaTKJNcwumN4rUT9Nlt9qP6Z66aRwi1RvZ,uG9e87q-mkIbEZcId-one5R7er",
      },
      keyspace: "dath",
    });
    await client.connect();
    console.log(`Cassandra (Astras) Connected: ${client.options.contactPoints}, keyspace:${client.keyspace}`.cyan.underline)

  } catch (err) {
    console.log(error)
    process.exit(1)
  }
};

const getClient = () => {
    if (!client) {
      throw new Error('Database connection not established');
    }
    return client;
  };

  module.exports = { connectCassandra, getClient };