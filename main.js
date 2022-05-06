const express=require('express')
const app=express()
const path=require('path')
//you r binding your app with http 
const http=require('http').Server(app)
const port =process.env.PORT ||8080;

//attached http sever with socket.io
const io=require('socket.io')(http);

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'src/index.html'))
})
//create the new connection 
io.on('connection',socket=>{
    console.log(socket.id)
    socket.on('disconnect',()=>{
        console.log("A user Disconnected ");

    })
    socket.on('message',(msg)=>{
        console.log("A user send the msg ",msg);
        
    })
    //server send the message to client 
    socket.emit("onNotifications","hey this is message from serverr to client ")

})

http.listen(port,()=>{
    console.log(`app listen at ${port}`)
})