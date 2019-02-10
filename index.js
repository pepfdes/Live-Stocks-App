var app = require("express")();
var http = require("http").Server(app);
var io = require("socket.io")(http);
var ws = require("ws");
var moment = require('moment');

const url = 'ws://stocks.mnet.website';
const connect = new ws(url);
app.get("/",function(req,res){
    res.sendFile(__dirname+'/index.html');
});
connect.onopen = () => {
    console.log('Opened');
}
io.on('connection',function(socket){
    console.log("User connected!");
   
    connect.onmessage = e => {
        io.emit("connect_cl",e.data);
    } 
    socket.on("connect",function(test){
        console.log("Connected !");
    });
});
http.listen(3001,function(){
    console.log("server started !");
})