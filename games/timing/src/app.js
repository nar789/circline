var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/',function(req,res) {
  res.send('hi');
});

app.get('/client',function(req,res){
  res.sendFile(__dirname + '/client.html');
});

var gs = io.of('/a.b.c');

let num = [];

function info(){
  var userid='';
  var roomid='';
  var ready='unready';
  var rank=0;
};
let nums=new Array(100);

let members=[];

gs.on('connection',function(socket){
  console.log(socket.id + '  user connected');

  socket.on('login',function(d){
    console.log(d);
    members.push(new info());
    let i=members.length-1;
    members[i].userid=d.userid;
    members[i].roomid=d.roomid;
    members[i].ready='unready';
    members[i].rank=0;
  	socket.join(d.roomid,()=>{
      console.log(socket.id + " is join in " + d.roomid)
      socket.emit('uid',i);
    });
  });

  socket.on('setready',(uid,ready)=>{
    console.log('__setready()  '+'   '+uid+'   '+ready)
    members[uid].ready=ready;
  });

  socket.on('startrequest',()=>{
    for(var i=0;i<members.length;i++){
      if(members[i].ready=='unready'){
        console.log('someone is unready.');
        return;
      }
    }
    for(var i=0;i<members.length;i++)
      nums[i]=0;
    console.log('success');
  });


  socket.on('call',function(d){
    if(d.num===num[socket.roomid]){
      socket.rank=d.num;
      num[socket.roomid]=num[socket.roomid]+1;
    }else{
      socket.rank=-1;
      let cs = io.sockets.clients(socket.roomid);
      io.to(socket.roomid).emit('gameover',cs);
    }
  });



  socket.on('disconnect',function(){
  	console.log(socket.id + ' user disconnected');
  });


});

http.listen(3000,function(){
  console.log('socket listen on *:3000');
});
