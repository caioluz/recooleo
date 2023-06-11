var express = require('express');
var bodyParser = require('body-parser')
var User = require('./src/classes/user.js'); 

var app = express()
 
// create application/json parser
var jsonParser = bodyParser.json()
 
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

// set the view engine to ejs
app.set('view engine', 'ejs');

// load up an ejs view file
app.get('/', function(req, res) {
    res.render('pages/index');
});
app.get('/about', function(req, res) {
    res.render('pages/about');
});
app.get('/cadastro', function(req, res) {
    res.render('pages/register');
});
app.get('/deposit', function(req, res) {
    res.render('pages/deposit');
});
app.post('/cadastro', urlencodedParser, function(req, res,){
    let {nome, email, password} = req.body;
    let usuario = new User(nome, email, password);
    usuario.add(req.body);
    res.render('pages/index');
});

// load public folder
app.use(express.static(__dirname + '/public'));

app.listen(8080);
console.log('8080 is the magic port');
