var speed=1;
let speed_max=3;
let speed_min_width=50;

let wind=[
    {id:"#windone",speed:"10",top:"60px",active:false},
    {id:"#windtwo",speed:"15",top:"20px",avtive:false},
    {id:"#windthree",speed:"5",top:"110px",active:false},
    {id:"#windfour",speed:"12",top:"110px",active:false},
    {id:"#windfive",speed:"7",top:"110px",active:false},
    {id:"#windsix",speed:"6",top:"110px",active:false},
    {id:"#flag",speed:"2",top:"170px",active:true}
];

var change_charge=(width)=>{
    $(".charge").css("width",speed_min_width+width*1+"px");
}

var speed_dec_interval;
var speed_decrease=()=>{
    var speed_dev_interval=setInterval(()=>{
        // 속도 감소
        if(speed>1){
            speed/=3;
        }
        if(speed<1){
            speed=1;
        }
        change_charge(speed*30);
        console.log("speed = "+speed);
    },1000);
}

var wind_set_interval;
var wind_setting=()=>{
    wind_set_interval=setInterval(()=>{
        // 바람들 위치 조정
        for(var z in wind){
            if(wind[z].active){
                var pos=wind[z].speed*1*speed+$(wind[z].id).css("right").split("px")[0]*1;
                if(pos>$(".world").css("width").split("px")[0]*1){
                    $(wind[z].id).css("right","-200px");
                    wind[z].active=false;
                }else{
                    $(wind[z].id).css("right",`${pos}px`);
                }
                // console.log(wind[z].id+":"+`${pos}px`);
            }
            let flag_offset=$("#flag").offset();
            let stick_offset=$("#stick").offset();

            if(flag_offset.left-stick_offset.left<0){
                // Game Stop
                console.log("compict"+(flag_offset.left-stick_offset.left));
                speed=0;
                clearInterval(speed_dec_interval);
                clearInterval(wind_gen_interval);
                clearInterval(wind_set_interval);
                clearInterval(timer_interval);
                $("#stick").css("animation","234");
                $(".modal").css("display","block");
                $(".modal").animate({opacity:1},1000,()=>{
                    $("#ranking").animate({opacity:1},1000,()=>{});
                });
            }
        }
    },100);
}
var wind_gen_interval;
var wind_generator=()=>{
    wind_gen_interval=setInterval(()=>{
        // 1/5 확률로 바람활성
        if(Math.floor(Math.random()*5)){
            var activation_wind=Math.floor(Math.random()*wind.length);
            if(!wind[activation_wind].active){
                wind[activation_wind].active=true;
            }
        }
    },100);
}

var increase_speed=()=>{
    speed+=1;
    change_charge(speed*30);
    console.log("speed = "+speed);
}

var time_count=0;
var timer_interval;
var timer_start=()=>{
    timer_interval=setInterval(()=>{
        time_count++;
        var minuts=Math.floor(time_count/60)+"";
        if(minuts.length==1){
            minuts="0"+minuts;
        }
        var seconds=time_count%60+"";
        if(seconds.length==1){
            seconds="0"+seconds;
        }
        $("#timer").text(minuts+":"+seconds);
        $("#timer").animate({backgroundColor:"#000",color:"#fff"});
    },1000);
}

var countdown=()=>{
    setTimeout(()=>{$("#countdown").text(4);},1000);
    setTimeout(()=>{$("#countdown").text(3);},2000);
    setTimeout(()=>{$("#countdown").text(2);},3000);
    setTimeout(()=>{$("#countdown").text(1);
        $("#countdown").animate({
            opacity:0
        },1000,()=>{
            timer_start();
            $(".modal").animate({opacity:0},1000,()=>{
                $(".modal").css("display","none");
            });
            $(".modal-text").animate({top:0},1000,()=>{});
        });
    },4000);
}
window.onload=()=>{
    countdown();
    wind_generator();
    wind_setting();
    speed_decrease();
    
}