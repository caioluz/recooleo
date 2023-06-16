var express = require("express");
var session = require("express-session");
var bodyParser = require("body-parser");
var User = require("./src/classes/user.js");
var Space = require("./src/classes/space.js");
var SpaceUser = require("./src/classes/spaceUser.js");

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

// middleware de verificação de autenticação
const requireAuth = (req, res, next) => {
  if (req.session && req.session.user) {
    next();
  } else {
    res.redirect("/login");
  }
};
const requireNotAuth = (req, res, next) => {
  if (!req.session || !req.session.user) {
    next();
  } else {
    res.redirect("/");
  }
};

// set the view engine to ejs
app.set("view engine", "ejs");

// load up an ejs view file
app.get("/", requireAuth, function (req, res) {
  res.render("pages/index", { user: req.session.user });
});
app.get("/register", requireNotAuth, function (req, res) {
  res.render("pages/register");
});
app.post("/register", urlencodedParser, function (req, res) {
  let { name, email, password } = req.body;
  let user = new User(name, email, password);

  user.add(req.body);
  res.redirect("/");
});
app.get("/login", requireNotAuth, function (req, res) {
  res.render("pages/login");
});
app.post("/login", urlencodedParser, async function (req, res) {
  let {email, password} = req.body;
  const user = await User.fecth(email);

  if (user && user[0].password === password) {
    req.session.user = user[0];
    res.redirect("/");
  } else {
    res.redirect("/login");
  }
});
app.get("/logout", requireAuth, function (req, res) {
  req.session.destroy();
  res.redirect("/");
});
app.get("/settings", requireAuth, function (req, res) {
  res.render("pages/settings", { user: req.session.user });
});
app.get("/info", requireAuth, function (req, res) {
  res.render("pages/info");
});
app.get("/spaces", requireAuth, async function (req, res) {
  const spaces = await SpaceUser.getSpaceByUser(req.session.user.id);

  res.render("pages/spaces", { 
    user: req.session.user,
    spaces: spaces
  });
});
app.get("/space-register", requireAuth, function (req, res) {
  res.render("pages/spaceRegister");
});
app.post("/space-register", urlencodedParser, function (req, res) {
  const { name, type, street } = req.body;
  const owner = req.session.user.id;
  let space = new Space(name, type, street, owner);

  space.add();
  res.redirect("/spaces");
});
app.get("/space-manager", requireAuth, function (req, res) {
  res.render("pages/spaceManager");
});
app.get("/space-remove", requireAuth, function (req, res) {
  res.render("pages/spaceRemove");
});
app.get("/space-edit", requireAuth, function (req, res) {
  res.render("pages/spaceEdit");
});
app.get("/space-users", requireAuth, function (req, res) {
  res.render("pages/spaceUser");
});
app.get("/oil", requireAuth, function (req, res) {
  res.render("pages/oil", { user: req.session.user });
});
app.get("/oil-container", requireAuth, function (req, res) {
  res.render("pages/oilContainer", {
    user: req.session.user,
    space: {
      nome: "Ed. Mirante",
      oil_current: 20,
      oil_max: 30,
      oil_percent: 80,
    },
  });
});
app.get("/participate", requireAuth, async function (req, res) {
  const spaces = await Space.fecth();
  res.render("pages/participate", {
    user: req.session.user,
    spaces: spaces,
  });
});
app.post("/participate", urlencodedParser, function (req, res) {
  const { space } = req.body;

});

// load public folder
app.use(express.static(__dirname + "/public"));

app.listen(8080, () => {
  console.log("Servidor iniciado em http://localhost:8080");
});
