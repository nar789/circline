module.exports=function(mongoose){
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
}
