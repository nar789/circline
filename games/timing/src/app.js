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

gs.on('connection',function(socket){
  console.log(socket.id + '  user connected');

  socket.on('login',function(d){
    socket.userid=d.userid;
    socket.roomid=d.roomid;
    socket.__proto__.ready='unready';
    socket.__proto__.rank=0;
  	socket.join(socket.roomid,()=>{console.log(socket.id + " is join in " +
      socket.roomid)});
  });

  socket.on('ready',function(d){
    console.log(socket.ready);
    socket.ready=d.ready;
    console.log(socket.id + "'s state : " + socket.ready);
  });


  socket.on('startrequest',()=>{

    let cs=[];
    gs.in(socket.roomid).clients((err,clients)=>{
      if(err) throw err;
      console.log(clients);
    });


    /*

    for(let i=0;i<cs.){
      if(c.ready==='unready')
        return;
    }

    num[socket.roomid]=1;
    io.to(socket.roomid).emit('gamestart');*/

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
  	console.log('user disconnected');
    let cs = io.sockets.clients(socket.roomid);
    if(cs.length===0){

    }
  });


});

http.listen(3000,function(){
  console.log('socket listen on *:3000');
});
