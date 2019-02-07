module.exports=function(mongoose){
	//Schema define
	var db={};
	db.Guser=mongoose.model('Guser',{
		uid : mongoose.Schema.Types.ObjectId,
		roomid : mongoose.Schema.Types.ObjectId,
		logintime : {type : Date, default : Date.now},
		state : {type : String, default : "{}"},
		result : {type : String, default : "{}"}
	});

	db.Groom=mongoose.model('Groom',{
		package : String
	});

	db.User = mongoose.model('User',{
		userid:String,
		password:Buffer,
		birth:Date,
		sex:String
	});

	//db connect
	const dburl='mongodb://localhost:27017/db';
	mongoose.connect(dburl,{ useNewUrlParser: true },function(err){
		if(err){console.log(err);}
		else{ console.log('Connected to ' + dburl);}
	});
	return db;
}
