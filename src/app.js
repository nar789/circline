var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var scrypt = require('scrypt');
//Schema define

var Client = mongoose.model('Client',{package:String,nick:String});
var State = mongoose.model('State',{userid:String,state:String});
var Ret = mongoose.model('Ret',{userid:String,result:String});

var User = mongoose.model('User',{
	userid:String,
	password:Buffer,
	birth:Date,
	sex:String
});

//db connect
const dburl='mongodb://localhost:27017/db';
mongoose.connect(dburl,{ useNewUrlParser: true },function(err){
	if(err){console.log(err);}
	else{ console.log('Connected to '+dburl);}
});





//Routes
var app = express();
app.set('view engine','pug');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());


app.get('/', function (req, res) {
	res.send('hi');
});


app.get('/splash', function (req, res) {
	res.render('splash',{});
});

app.get('/join', function (req, res) {
	res.render('join',{});
});

//RestAPI
app.post('/api/user/join',function(req,res){
	var u=new User();
	u.userid=req.body.userid;
	u.birth=new Date(req.body.birth);
	u.sex=req.body.sex;
	
	let scryptParam=scrypt.paramsSync(0.1);
	var secured_password=scrypt.kdfSync(req.body.password,scryptParam);
	console.log("secured_password : "+secured_password.toString("base64"));
	u.password=new Buffer(secured_password,'base64');
	//scrypt.verifyKdfSync(new Buffer(encodedPassword, 'base64'), inputPassword) //true or false


	User.countDocuments({userid:u.userid},function(e,cnt){
		if(e){console.log(e);res.json({msg:"fail"});return;}
		if(!cnt){
			u.save(function(err){
				if(err){console.log(err);res.json({msg:"fail"});return;}
				res.json({msg:"success"});
			});
		}else{
			User.findOne({userid:u.userid},function(e,d){
				if(e){console.log(e);return;}
				console.log("saved_password : "+d.password.toString('base64'));
				let comp=scrypt.verifyKdfSync(d.password, req.body.password);
				console.log("IsCorrect? : "+ comp);
			});
			res.json({msg:"alreadyExist"});
		}
	});
});

app.post('/games/connect', function (req, res) {
	
	res.render('join',{});
});



app.listen(3000, function () {
  console.log('Circline for (c)HUME running...');
});

