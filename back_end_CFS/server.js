const express = require("express");
const colors = require("colors");
const { Server } = require("http");
const { errorHandler } = require("./middleware/errorMiddleware");
const path = require("path");
const dotenv = require("dotenv").config({ path: "../.env" });
const app = express();

const { Client } = require("cassandra-driver");
const {connectCassandra} = require("./config/connectCas")

app.use(express.json());
app.use(express.urlencoded({ extended: "false" }));

const port = process.env.CAS_BACKEND_PORT || 5000;
connectCassandra()

app.use("/api/comment",require('./routes/commentRoutes'))

// async function run() {
//     const client = new Client({
//       cloud: { secureConnectBundle: './secure-connect-mydatabase.zip' },
//       credentials: { username: 'QUntLDogdEWrqAOOYASDbJXk', password: 'PRQafe9lZzfUfWdaNeDrK4J2J3nDfck7xd2oFj.jF9ZCcPhSv-3WzLf3TjBH4M1Tf5YgaTKJNcwumN4rUT9Nlt9qP6Z66aRwi1RvZ,uG9e87q-mkIbEZcId-one5R7er' },
//       keyspace: 'dath' 
//     });
  
//     await client.connect();
  
//     // Execute a query
//     const rs = await client.execute('SELECT * FROM system.local');
//     console.log(client.options.contactPoints);
//     console.log(client.keyspace);


//   }
  
//   // Run the async function
//   run();

app.listen(port, () => console.log(`Server start on port ${port}`));
