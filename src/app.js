var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var scrypt = require('scrypt');
var session = require('express-session');
var FileStore = require('session-file-store')(session);
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
app.use(session({
	secret:'#!CIRCLINEISOURFUTURE!@',
	resave: false,
	saveUninitialized: true,
	store:new FileStore()
}));


app.get('/', function (req, res) {
	res.send('hi');
});


app.get('/splash', function (req, res) {
	res.render('splash',{});
});

app.get('/join', function (req, res) {
	res.render('join',{});
});

app.get('/login',function(req,res){
	if(req.session.logined===true)
		res.redirect('/main');
	else
		res.render('login',{});
});

app.get('/logout',function(req,res){
	if(req.session.userid){
		req.session.destroy();
	}
	res.redirect('/login');
});

app.get('/main',function(req,res){
	if(req.session.logined)
		res.send('<center><h1>Welcome '+req.session.userid+' <a href=\'/logout\'>logout</a></h1></center>');
	else
		res.redirect('/login');
});



//RestAPI
app.post('/api/user/login',function(req,res){
	User.countDocuments({userid:req.body.userid},function(e,cnt){
		if(e){console.log(e);return;}
		if(cnt!=1){res.json({msg:'id or password is wrong.'});return;}
		else{
			User.findOne({userid:req.body.userid},function(e,d){
				if(e){console.log(e);return;}
				let comp=scrypt.verifyKdfSync(d.password, req.body.password);
				if(comp){
					req.session.logined=true;
					req.session.userid=req.body.userid;
					res.json({msg:'logined'});
				}else{
					res.json({msg:'id or password is wrong.'});
				}
			});	
		}
	});
});
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
				req.session.logined=true;
				req.session.userid=req.body.userid;
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

