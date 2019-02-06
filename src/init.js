module.exports=function(express,bodyParser,session,FileStore){
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

	app.listen(3000, function () {
	  console.log('Circline designed by (c)HUME running...');
	});
	return app;
}