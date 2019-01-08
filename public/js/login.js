$(function(){
	$(".container").fadeIn('slow');
});

function start(){
	var userid=$("#userid").val();
	var password=$("#password").val();
	$.post("/api/user/login",{
		userid:userid,
		password:password
	},function(r,s){
		
		if(r.msg=="logined")
		{
			location.href="/main";
		}else{
			alert(r.msg);
		}
	});
}

function join(){
	location.href="/join";
}