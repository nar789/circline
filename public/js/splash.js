$(document).ready(function () {

	
	$('#icon').animate({
		width:'160%',
		height:'160%'},300,function(){
			$('#back').animate({opacity:'1'},100);
			$('#icon').animate({opacity:'0'},1000,function(){
				$('#title').animate({opacity:'1',top:'-10px'},1000);
			});
		});

	setTimeout(function(){
		$("body").fadeOut(1000,function(){
			window.location="join";
		});
	},3000);
})