var express = require('express');
var app = express();
app.set('view engine','pug');
app.get('/', function (req, res) {
	res.render('index',{});
});

app.listen(3000, function () {
  console.log('dont_breath_just_run ...');
});

app.use(express.static('public'));