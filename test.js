var IoT = require("./index");

var iot = new IoT();

iot.connect(()=>{
  iot.getValue("00000000-0000-0000-0001-000000000002", "/main", (response)=>{
    console.log(response);
  });


  setTimeout(()=>{
    //process.exit(1)
    iot.setValue("00000000-0000-0000-0001-000000000002", "/main", {"dimmingSetting":100});
  }, 1000);

  setTimeout(()=>{
    //process.exit(1)
    iot.setValue("00000000-0000-0000-0001-000000000002", "/main", {"dimmingSetting":50});
  }, 2000);
  setTimeout(()=>{
    //process.exit(1)
    iot.setValue("00000000-0000-0000-0001-000000000002", "/main", {"dimmingSetting":1});

    process.exit(1);
  }, 3000);
});


