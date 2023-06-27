
export default function parser(packet, parser_id){

  if(parser_id=="1q2w3e4r") {
    let hexArray = [];
    let timeHex = "";
    let lengthHex = "";
    let timeArray = [];
    let array0=[];
    let array1=[];
    let array2=[];
    let dt = 33;
    
    let dataArray = [];

    packet.reverse().forEach((e)=>{
      for (let i = 0; i < e.payload.length; i += 2) {
        hexArray.push(e.payload[i] + e.payload[i + 1]);
      }
      hexArray.forEach((datum,idx)=>{
        if (idx<4) {
          timeHex += datum;
          if (idx==3) {
            timeArray.push(parseInt(timeHex,16));
          }
        }
        if (idx>3 && idx<6) {
          lengthHex += datum;
          if (idx==5) {
            for (let j=0;j<parseInt(lengthHex,16)-1;j++) {
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
      lengthHex = "";
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

    return ({x:[
      {
        "name": "x",
        "data": dataArray0
      }], y:[{
      "name": "y",
      "data": dataArray1
    }], z:[{
      "name": "z",
      "data": dataArray2
    }]});
  }
}