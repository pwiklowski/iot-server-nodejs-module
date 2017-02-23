const WebSocket = require('ws');


module.exports = function(){


    console.log("create");
    const ws = new WebSocket('ws://127.0.0.1:7002/');

    ws.on('open', function open() {
        console.log("socket opened");
    });

    ws.on('message', function incoming(data, flags) {
        console.log("on message", data);
    });



    this.test = function(){
        console.log("test");
    }

} 
