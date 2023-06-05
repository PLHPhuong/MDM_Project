const express = require('express');
const colors = require("colors");
const dotenv = require("dotenv").config({path: "../.env"});
const exphbs = require('express-handlebars');
const path = require("path");
const app = express();

const hbs = exphbs.create({
    defaultLayout:'main',
    extname:'hbs'
});

// Use static folder
app.use(express.static(path.join(__dirname, "public")));
app.use(
  express.urlencoded({
    extended: false,
  })
);

app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", "./public/views");



const port = process.env.FRONTEND_PORT || 3000




app.listen(port, () => console.log(`Client start on port ${port}`));

