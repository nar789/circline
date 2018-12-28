var express = require('express');
var app = express();
app.set('view engine','pug');
app.get('/', function (req, res) {
	res.render('index',{});
});


app.get('/splash', function (req, res) {
	res.render('splash',{});
});

app.listen(3000, function () {
  console.log('Circline for (c)HUME running...');
});

app.use(express.static('public'));