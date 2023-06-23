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
  let { email, password } = req.body;
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
  const spaces = await SpaceUser.getApprovedSpacesByUser(req.session.user.id);

  res.render("pages/spaces", {
    user: req.session.user,
    spaces: spaces,
  });
});
app.get("/space-register", requireAuth, function (req, res) {
  res.render("pages/spaceRegister");
});
app.post("/space-register", urlencodedParser, async function (req, res) {
  const { name, type, street } = req.body;
  const owner = req.session.user.id;
  let space = new Space(name, type, street, owner);

  const idSpace = await space.add();

  // Atribui o usuário da sessão como membro do grupo que ele criou
  let spaceUser = new SpaceUser(req.session.user.id, idSpace, 1);

  spaceUser.add();

  res.redirect("/spaces");
});
app.get("/space-manager", requireAuth, async function (req, res) {
  const idSpace = req.query.id;
  const space = await Space.fecthSpaceById(idSpace);

  res.render("pages/spaceManager", { space: space, user: req.session.user });
});
app.get("/space-remove", requireAuth, function (req, res) {
  const idSpace = req.query.id;
  res.render("pages/spaceRemove", { spaceId: idSpace });
});

app.post("/space-remove", urlencodedParser, function (req, res) {
  const spaceId = req.query.id;
  Space.deleteSpace(spaceId);
  SpaceUser.delete(spaceId);

  res.redirect("/spaces");
});

app.get("/space-edit", requireAuth, async function (req, res) {
  const idSpace = req.query.id;
  const space = await Space.fecthSpaceById(idSpace);
  res.render("pages/spaceEdit", { space: space });
});
app.post("/space-edit", urlencodedParser, function (req, res) {
  const { name, type, street } = req.body;
});
app.get("/space-users", requireAuth, async function (req, res) {
  const users = await SpaceUser.getAllUsersBySpace(req.query.id);
  const approvedMembers = users.filter((user) => user.approved === 1);
  const pendingMembers = users.filter((user) => user.approved === 0);

  res.render("pages/spaceUser", {
    approvedMembers: approvedMembers,
    pendingMembers: pendingMembers,
    user: req.session.user,
    spaceId: req.query.id,
  });
});
app.get("/oil", requireAuth, function (req, res) {
  res.render("pages/oil", { spaceId: req.query.id });
});
app.get("/oil-container", requireAuth, async function (req, res) {
  const space = await Space.fecthSpaceById(req.query.id);
  const percent = Math.round(
    (space.coletor.litrosAtual * 100) / space.coletor.litrosTotal
  );

  res.render("pages/oilContainer", {
    user: req.session.user,
    space: space,
    percent: percent,
  });
});
app.post("/oil-container", urlencodedParser, async function (req, res) {
  const { id, quantity } = req.body;
  const url = "/oil-container?id=" + id;
  Space.setLiters(id, quantity);
  res.redirect(url);
});
app.get("/participate", requireAuth, async function (req, res) {
  const allSpaces = await Space.fecth();

  // Busca todos os espaços que o usuário está, mesmo que a solicitação esteja pendente
  const userSpaces = await SpaceUser.getAllSpacesByUser(req.session.user.id);

  const avaliableSpaces = allSpaces.filter((space) => {
    let avaliable = true;
    for (let i = 0; i < userSpaces.length; i++) {
      if (userSpaces[i][0].id === space.id) {
        avaliable = false; // em filter tudo que retorna falso não entra no array de retorno
      }
    }
    return avaliable; // só entra no array de retorno se retornar true(não ser encontrado nos epaços do usuário)
  });
  res.render("pages/participate", {
    user: req.session.user,
    spaces: avaliableSpaces,
  });
});
app.post("/participate", urlencodedParser, function (req, res) {
  const space = Number(req.body.space);
  const spaceUser = new SpaceUser(req.session.user.id, space, 0);

  spaceUser.add();
  res.redirect("/spaces");
});

app.post("/manage-user", urlencodedParser, function (req, res) {
  const type = req.query.type;
  const idUserReq = req.query.idUserReq;
  const spaceId = req.query.idSpace;
  SpaceUser.edit(spaceId, idUserReq, type);
  res.redirect(`/space-users?id=${spaceId}`);
});

app.post("/drain-out", urlencodedParser, function (req, res) {
  const spaceId = req.query.id;

  Space.drainOut(spaceId);
  res.redirect(`/oil-container?id=${spaceId}`);
});

// load public folder
app.use(express.static(__dirname + "/public"));

app.listen(8080, () => {
  console.log("Servidor iniciado em http://localhost:8080");
});
