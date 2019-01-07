var sex=null;//1 is male and 2 is female.
$(function () {	
	$('#date').datetimepicker({ignoreReadonly:true,
		format:'YYYY-MM-DD',
		icons: {
          time: "tim-icons icon-watch-time",
          date: "tim-icons icon-calendar-60",
          up: "fa fa-chevron-up",
          down: "fa fa-chevron-down",
          previous: 'tim-icons icon-minimal-left',
          next: 'tim-icons icon-minimal-right',
          today: 'fa fa-screenshot',
          clear: 'fa fa-trash',
          close: 'fa fa-remove'
        }
	});

	$(".container").fadeIn('slow');
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
	var d=new Date();
	var today=(d.getMonth()+1)+"/"+d.getDate()+"/"+d.getFullYear();
	//$('#date').val(today);
	
});

function start(){
	var userid=$("#userid").val();
	var password=$("#password").val();
	var password_check=$("#password_check").val();
	if(password!=password_check){
		alert('above passwords are different.');
		return;
	}
	var birth=$("#date").val();

	if(!userid || !password || !password_check || !birth){
		alert("plz give me all informations.");
		return;
	}
	var sexual=(sex==1)?"male":"female";
	$.post('/api/user/join',{
		userid:userid,
		password:password,
		birth:birth,
		sex:sexual
	},function(d,s){
		alert(d.msg);
	});
}