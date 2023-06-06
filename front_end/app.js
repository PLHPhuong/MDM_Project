const express = require('express');
const colors = require("colors");
const dotenv = require("dotenv").config({path: "../.env"});
const exphbs = require('express-handlebars');
const path = require("path");
const { engine } = require('express-handlebars');
const port = process.env.FRONTEND_PORT || 3000

const app = express();
app.use(express.static(path.join(__dirname, "public")));



const hbs = exphbs.create({
    // defaultLayout:false,
    extname:'hbs'
});

// Use static folder


app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", "./views");
app.use(express.urlencoded({extended: false,}));

// app.use("/", (req,res) => {
//     res.render("temp", {
//         layout: 'main' 
//     });
// });

app.use("/", require("./routes/unityRoute"));

// Test default template od handlebar
// app.use(express.static(path.join(__dirname, "public")));

// app.engine('.hbs',engine({
//     extname:'.hbs',
//     defaultLayout: false,
//     layoutsDir: './views'
// }))

// app.set("view engine", 'hbs');


// app.get('/temp',(req,res)=> {
//     res.render('temp')
// })



// // Use static folder
// app.use(express.static(path.join(__dirname, "public")));
// console.log(path.join(__dirname, "public"))
// app.use(
//   express.urlencoded({
//     extended: false,
//   })
// );

// app.engine("handlebars", engine);
// app.set("view engine", "handlebars");
// app.set("views", "./views");

// app.use("/", require("./routes/unityRoute"));

app.listen(port, () => console.log(`Client start on port ${port}`));

