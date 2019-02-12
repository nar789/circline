module.exports=function(app,scrypt,db) {

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
		//get the "app.gamelist" and render gamelist
		//req.session.userid_string

		if(req.session.logined)
		{
			res.render('main',{ gamelist : app.gamelist, userid : req.session.userid_string });
		}
		else
			res.redirect('/login');
	});



	//RestAPI
	app.post('/api/user/login',function(req,res){
		db.User.countDocuments({userid:req.body.userid},function(e,cnt){
			if(e){console.log(e);return;}
			if(cnt!=1){res.json({msg:'id or password is wrong.'});return;}
			else{
				db.User.findOne({userid:req.body.userid},function(e,d){
					if(e){console.log(e);return;}
					let comp=scrypt.verifyKdfSync(d.password, req.body.password);
					if(comp){
						req.session.logined=true;
						//req.session.userid=req.body.userid;
						req.session.userid_string=req.body.userid;
						req.session.userid=d.id;
						res.json({msg:'logined'});
					}else{
						res.json({msg:'id or password is wrong.'});
					}
				});	
			}
		});
	});
	app.post('/api/user/join',function(req,res){
		var u=new db.User();
		u.userid=req.body.userid;
		u.birth=new Date(req.body.birth);
		u.sex=req.body.sex;
		
		let scryptParam=scrypt.paramsSync(0.1);
		var secured_password=scrypt.kdfSync(req.body.password,scryptParam);
		console.log("secured_password : "+secured_password.toString("base64"));
		u.password=new Buffer(secured_password,'base64');
		//scrypt.verifyKdfSync(new Buffer(encodedPassword, 'base64'), inputPassword) //true or false


		db.User.countDocuments({userid:u.userid},function(e,cnt){
			if(e){console.log(e);res.json({msg:"fail"});return;}
			if(!cnt){
				u.save(function(err,user){
					if(err){console.log(err);res.json({msg:"fail"});return;}
					req.session.logined=true;
					req.session.userid_string_req.body.userid;
					//req.session.userid=req.body.userid;
					req.session.userid=user.id;
					res.json({msg:"success"});
				});
			}else{
				db.User.findOne({userid:u.userid},function(e,d){
					if(e){console.log(e);return;}
					console.log("saved_password : "+d.password.toString('base64'));
					let comp=scrypt.verifyKdfSync(d.password, req.body.password);
					console.log("IsCorrect? : "+ comp);
				});
				res.json({msg:"alreadyExist"});
			}
		});
	});
	
}