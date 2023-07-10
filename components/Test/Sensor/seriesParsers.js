export default function parser(packet, parser_id){
 
  if(parser_id=="acc") {
    let hexArray = [];
    let timeHex = "";
    let timeArray = [];
    let array0=[];
    let array1=[];
    let array2=[];
    let dt = 33;
    
    packet.reverse().forEach((e)=>{
      for (let i = 0; i < e.payload.length; i += 2) {
        hexArray.push(e.payload[i] + e.payload[i + 1]);
      }
      hexArray.forEach((datum,idx)=>{
        if (idx>1 && idx<6) {
          timeHex += datum;
          if (idx==5) {
            timeArray.push(parseInt(timeHex,16));
            for (let j=0;j<29;j++) {
              timeArray.push(timeArray.at(-1)+dt);
            }
          }
        }
        if (idx>5) {
          if (idx%3 == 0) {
            array0.push(parseInt(datum, 16));
          }
          if (idx%3 == 1) {
            array1.push(parseInt(datum, 16));
          }
          if (idx%3 == 2) {
            array2.push(parseInt(datum, 16));
          }
        }
      })
      timeHex = "";
      hexArray = [];
    })

    const dataArray0 = timeArray.map((time, index) => {
      return ([time, array0[index]]);
    });

    const dataArray1 = timeArray.map((time, index) => {
      return ([time, array1[index]]);
    });

    const dataArray2 = timeArray.map((time, index) => {
      return ([time, array2[index]]);
    });
    return ([
      {
        "name": "x",
        "data": dataArray0
      },{
      "name": "y",
      "data": dataArray1
    },{
      "name": "z",
      "data": dataArray2
    }]);
  }

  if(parser_id=="prs") {
    let hexArray = [];
    let timeHex = "";
    let timeArray = [];
    let pressureHex = "";
    let pressureArray = [];
    let dt = 100;

    packet.reverse().forEach((e)=>{
      for (let i = 0; i < e.payload.length; i += 2) {
        hexArray.push(e.payload[i] + e.payload[i + 1]);
      }
      hexArray.forEach((datum,idx)=>{
        if (idx>1 && idx<6) {
          timeHex += datum;
          if (idx==5) {
            timeArray.push(parseInt(timeHex,16));
            for (let j=0;j<19;j++) {
              timeArray.push(timeArray.at(-1)+dt);
            }
          }
        }
        if (idx>5) {
          pressureHex +=datum;
          if ((idx-6)%4 == 3) {
            if (Buffer.from(pressureHex, 'hex').readFloatLE() > 900) {
              pressureArray.push(Buffer.from(pressureHex, 'hex').readFloatLE());
              pressureHex = "";
            }
            else {
              pressureArray.push(null);
              pressureHex = "";
            }
          }          
        }
      })
      timeHex = "";
      hexArray = [];
    })
    
    const dataArray = timeArray.map((time, index) => {
      return ([time, pressureArray[index]]);
    });
    
    return ([
      {
        "name": "pressure",
        "data": dataArray
      }]);
  }

  if(parser_id=="trh") {
    let hexArray = [];
    let timeHex = "";
    let timeArray = [];
    let tempHex = "";
    let tempArray = [];
    let rhHex = "";
    let rhArray = [];
    let dt = 1000;

    packet.reverse().forEach((e)=>{
      for (let i = 0; i < e.payload.length; i += 2) {
        hexArray.push(e.payload[i] + e.payload[i + 1]);
      }
      hexArray.forEach((datum,idx)=>{
        if (idx>1 && idx<6) {
          timeHex += datum;
          if (idx==5) {
            timeArray.push(parseInt(timeHex,16));
            for (let j=0;j<19;j++) {
              timeArray.push(timeArray.at(-1)+dt);
            }
          }
        }
        if (idx>5) {
          if ((idx-6)%4<2) {
            tempHex+=datum;
            if ((idx-6)%4==1) {
              tempArray.push(parseInt(tempHex, 16));
              tempHex = "";
            }
          }
          if ((idx-6)%4>1) {
            rhHex+=datum;
            if ((idx-6)%4==3) {
              rhArray.push(parseInt(rhHex, 16));
              rhHex = "";
            }
          }
        }
      })
      timeHex = "";
      hexArray = [];
    })

    const dataArray0 = timeArray.map((time, index) => {
      return ([time, tempArray[index]]);
    });

    const dataArray1 = timeArray.map((time, index) => {
      return ([time, rhArray[index]]);
    });

    return ([
      {
        "name": "temperature",
        "data": dataArray0
      },{
      "name": "rh",
      "data": dataArray1
    }]);
  }
}