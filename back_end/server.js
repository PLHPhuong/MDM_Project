const express = require("express");
const colors = require("colors");
const { Server } = require("http");
const { errorHandler } = require("./middleware/errorMiddleware");
const connectMongoDB = require("./config/mongodb");
const dotenv = require("dotenv").config();
const port = process.env.PORT || 5000;
const app = express();

connectMongoDB();

app.use(express.json());
app.use(express.urlencoded({ extended: "false" }));

app.use("/api/accommodations", require("./routes/testRoutes"));

app.use(errorHandler);

app.listen(port, () => console.log(`Server start on port ${port}`));
