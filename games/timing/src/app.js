var e=require('express');


var app=e();

app.listen(1844,function(){
	console.log('this is circline games.');
});

app.get('/',function(req,res) {
	res.send('timing game');
});