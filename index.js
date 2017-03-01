const WebSocket = require('ws');

module.exports = function () {
  const RequestAuthorize = "RequestAuthorize";
  const RequestGetDevices = "RequestGetDevices";
  const RequestGetDeviceResources = "RequestGetDeviceResources";
  const RequestSetValue = "RequestSetValue";
  const RequestGetValue = "RequestGetValue";
  const RequestSubscribeDevice = "RequestSubscribeDevice";
  const RequestUnsubscribeDevice = "RequestUnsubscribeDevice";

  var callbacks = {};
  var mid = 0;

  var ws = undefined;

  this.connect = (onConnected)=>{
    this.ws = new WebSocket('ws://127.0.0.1:7002/');
    this.ws.on('open', function open() {
      onConnected();
    });
    this.ws.on('message', function incoming(data, flags) {
      onMessage(data);
    });
  };

  send = (request, callback) => {
    let message = {
      "payload": request
    };

    if (callback !== undefined) {
      message["mid"] = mid;
      callbacks[mid] = callback;
      mid++;
    }

    this.ws.send(JSON.stringify(message));
  }

  onMessage = (response) => {
    let data = JSON.parse(response);
    let mid = data.mid;

    let callback = callbacks[mid];

    if (callback !== undefined) {
      callback(data.payload);
      delete callbacks[mid];
    }
  }

  this.getDevices = (callback) => {
    send({
      "request": RequestGetDevices
    }, callback);
  }

  this.isDeviceOnline= (deviceId, callback) => {
    send({
      "request": RequestGetDevices
    }, (response)=>{
      var found = false;
      response.devices.forEach((device)=>{
        if(device.id === deviceId) found = true;
      });
      callback(found);
    });
  }

  this.setValue = (di, variable, value) => {
    console.log("SetValue", di, variable, value);
    send({"request": RequestSetValue, "di": di, "resource": variable, "value": value});
  }

  this.getValue = (di, variable, callback) => {
    send({"request": RequestGetValue, "di": di, "resource": variable}, callback);
  }

  this.getEvent = () => {
    return JSON.parse(process.argv[2]);
  }
}
