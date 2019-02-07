module.exports=function(app,db) {
	//generate-room
	app.post('/api/game/generate-room',function(req,res){
		if(req.session.logined)		
		{
			var package=req.body.package;
			var r = new db.Groom();
			r.package=package;
			r.save(function(err,room){
				if(err){
					console.log(err); res.json({msg:"fail"}); return;
				}
				res.json({id:room.id});
			});
		}else
			res.redirect('/login');
	});

	app.post('/api/game/connect',function(req,res){
		if(req.session.logined){
			var gu = new db.Guser();
			gu.uid=req.session.userid;
			gu.roomid=req.body.roomid;
			db.Guser.countDocuments({
				uid : req.session.userid,
				roomid : req.body.roomid
			},function(err,cnt){
				if(err){console.log(err);res.json({msg:"fail"});return;}
				
				if(cnt>=1){

					db.Guser.findOne({
						uid : req.session.userid,
						roomid : req.body.roomid
					},function(err,obj){
						obj.remove();
					})

				}
				
				gu.save(function(err){
					if(err){console.log(err); res.json({msg:"fail"}); return;}

					res.json({msg:"success"});
				});		
				
			});
			
		}else
			res.redirect('/login');
	});

	app.post('/api/game/disconnect',function(req,res){
		if(req.session.logined){
			db.Guser.findOne({
				uid : req.session.userid,
				roomid : req.body.roomid
			},function(err,user){
				if(err){console.log(err); res.json({msg:"fail"}); return;}
				user.remove();
				res.json({msg:"success"});
			});
		}else
			res.redirect('/login');
	});

	app.post('/api/game/users',function(req,res){
		
		if(req.session.logined){
			db.Guser.find({
				roomid : req.body.roomid
			},async function(err,user){
				user=JSON.stringify(user);
				user=JSON.parse(user);
				if(err){console.log(err); res.json({msg:"fail"}); return;}
				for(var i=0;i<user.length;i++){
					try{
						const u=await db.User.findById(user[i].uid);
						user[i].userid=u.userid;
						user[i].sex=u.sex;
					}catch(err){
						console.error(err);res.json({msg:"fail"}); return;
					}
				}
				res.json(user);
			});
		}else
			res.redirect('/login');
	});

	app.post('/api/game/state',async function(req,res){
		try{
			
			if(req.session.logined)
			{

				const gu = await db.Guser.update({
					uid : req.session.userid,
					roomid : req.body.roomid
				},{
					state : req.body.state
				});
				res.json({msg:"success"});


			}else res.redirect('/login');

		}catch(err)
		{
			console.error(err);res.json({msg:"fail"}); return;
		}
	});


	app.post('/api/game/result',async function(req,res){
		try{
			
			if(req.session.logined)
			{

				const gu = await db.Guser.update({
					uid : req.session.userid,
					roomid : req.body.roomid
				},{
					result : req.body.result
				});
				res.json({msg:"success"});
				

			}else res.redirect('/login');

		}catch(err)
		{
			console.error(err);res.json({msg:"fail"}); return;
		}
	});

}