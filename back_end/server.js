const express = require("express");
const colors = require("colors");
const { Server } = require("http");
const { errorHandler } = require("./middleware/errorMiddleware");

const connectMongoDB = require("./config/mongodb");
const dotenv = require("dotenv").config();
const port = process.env.BACKEND_PORT || 5000;
const app = express();
const {AddAttraction } = require("./test_function/ActivitiesSample")

connectMongoDB();



app.use(express.json());
app.use(express.urlencoded({ extended: "false" }));


AddAttraction()
// start with localhost:{port}
// app.use("/api/tests", require("./routes/testRoutes"));
app.use("/api/activities", require("./routes/activitiesRoutes"));
app.use("/api/actdetail", require("./routes/actDetailRoutes"));
app.use("/api/purchaseticket", require("./routes/purchaseTicketRoutes"));

app.use("/api/user", require("./routes/userRoutes"));
app.use("/api/acttraction", require("./routes/serviceRoutes/attractionRoutes"));



app.use(errorHandler);




app.listen(port, () => console.log(`Server start on port ${port}`));

