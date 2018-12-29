var sex=null;//1 is male and 2 is female.
$(function () {
	$("body").fadeIn('slow');
	sex=Math.floor(Math.random()*2)+1;
	if(sex==1)$('#male').addClass("male-hover");
	else $('#female').addClass("female-hover");
	$('.sex').click(function(){
		$('.sex').removeClass('male-hover');
		$('.sex').removeClass('female-hover');
		if(this.id=='male')
			{$('#male').addClass("male-hover");sex=1;}
		if(this.id=='female')
			{$('#female').addClass("female-hover");sex=2;}
	});
});