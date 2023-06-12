var express = require("express");
var session = require("express-session");
var bodyParser = require("body-parser");
var User = require("./src/classes/user.js");

var app = express();

//create secret of section
app.use(
  session({
    secret: "hjf382y32vh2b3835hbfh",
    resave: true,
    saveUninitialized: true,
  })
);

// create application/json parser
var jsonParser = bodyParser.json();

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });

// set the view engine to ejs
app.set("view engine", "ejs");

// load up an ejs view file
app.get("/", function (req, res) {
  if (req.session.user) {
    res.redirect("home");
  } else {
    res.render("pages/index");
  }
});

app.post("/", urlencodedParser, async function (req, res) {
  let { email, password } = req.body;

  const user = await User.fecthUser(email);

  if (user && user[0].senha === password) {
    req.session.user = user[0];
    res.redirect("home");
  } else {
    res.render("pages/index");
  }
});

app.get("/home", function (req, res) {
  res.render("pages/home");
});
app.get("/cadastro", function (req, res) {
  res.render("pages/register");
});
app.post("/cadastro", urlencodedParser, function (req, res) {
  let { nome, email, password } = req.body;
  let usuario = new User(nome, email, password);
  usuario.add(req.body);
  res.render("pages/index");
});

// load public folder
app.use(express.static(__dirname + "/public"));

app.listen(5001);
console.log("8080 is the magic port");
