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
];

var change_charge=(width)=>{
    $(".charge").css("width",speed_min_width+width*1+"px");
}

var speed_decrease=()=>{
    setInterval(()=>{
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

var wind_setting=()=>{
    setInterval(()=>{
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
        }
    },100);
}
var wind_generator=()=>{
    setInterval(()=>{
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

window.onload=()=>{
    
    wind_generator();
    wind_setting();
    speed_decrease();
}