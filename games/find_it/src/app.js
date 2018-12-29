var express = require('express');
var app = express();
app.set('view engine','pug');
app.get('/', function (req, res) {
	res.render('index',{});
});

app.listen(3000, function () {
  console.log('find_it run ...');
});

app.use(express.static('public'));