const express = require('express');
const colors = require("colors");
const dotenv = require("dotenv").config({path: "../.env"});
const exphbs = require('express-handlebars');
const path = require("path");
const { engine } = require('express-handlebars');
const cookieParser = require('cookie-parser');
const session = require('express-session')
const port = process.env.FRONTEND_PORT || 3000

const app = express();

// Use static folder
app.use(express.static(path.join(__dirname, "public")));



const hbs = exphbs.create({
    // defaultLayout:false,
    extname:'hbs'
});



app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", "./views");

app.use(express.json());
app.use(express.urlencoded({extended: false,}));
app.use(cookieParser());

app.use(session({
    secret: 'group10',
    resave: true,
    saveUninitialized: true,
    cookie: {
        expires: 600000
    }
}));

app.use((req, res, next) => {
    if (req.cookies.user && !req.session.user) {
        res.clearCookie('user');        
    }
    next();
});


// app.use("/", (req,res) => {
//     res.render("temp", {
//         layout: 'main' 
//     });
// });

app.use("/", require("./routes/unityRoute"));
app.use("/attraction", require("./routes/attractionRoute"));
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

