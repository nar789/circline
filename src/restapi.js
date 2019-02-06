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
			gu.save(function(err){
				if(err){
					console.log(err); res.json({msg:"fail"}); return;
				}
				res.json({msg:"success"});
			});
		}
	});
}