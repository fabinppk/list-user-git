var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var PORT = process.env.PORT || 3000;

app.use(express.static(__dirname));
app.set('views', __dirname + '/');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.get('/usuario/:id', function(req, res) {
  res.render('usuario.html');
});

app.get('/usuario/:id/:repo', function(req, res) {
  res.render('repo.html');
});

app.listen(PORT, function() {
    console.log('Server listening on ' + PORT);
});
