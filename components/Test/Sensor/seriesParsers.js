
export default function parser(packet, parser_id, targetSensor){

  if(parser_id=="1q2w3e4r") {
    let array0=[];
    let array1=[];
    let array2=[];
    let hexArray;
    let timeBinary = "";
    let dtBinary = "";
    let xBinary = "";
    let yBinary = "";
    let zBinary = "";

    packet.forEach((e,i)=>{
      console.log(e.receivedData);
      hexArray = e.receivedData.split("").map(char => parseInt(char.charCodeAt(0),10));
      console.log(hexArray);
      hexArray.forEach((datum,idx)=>{
        if (idx<4) {
          console.log(datum.toString(2));
          timeBinary += datum.toString(2);
        }
        if (idx>3 && idx<8) {
          dtBinary += datum.toString(2);
        }
        if (idx>8) {
          if ((idx-4)%12<4) {
            xBinary += datum.toString(2);
            if ((idx-4)%12 == 3) {
              array0.push(parseInt(xBinary,2));
              xBinary = "";
            }
          }
          if ((idx-4)%12>3 && (idx-4)%12<8) {
            yBinary += datum.toString(2);
            if ((idx-4)%12 == 7) {
              array1.push(parseInt(yBinary,2));
              yBinary = "";
            }
          }
          if ((idx-4)%12 >7) {
            zBinary += datum.toString(2);
            if ((idx-4)%12 == 11) {
              array2.push(parseInt(zBinary,2));
              zBinary = "";
            }
          }
        }
      })

      console.log("t: "+parseInt(timeBinary,2));
      console.log("dt: "+parseInt(dtBinary,2));
      console.log("x: "+array0);
      console.log("y: "+array1);
      console.log("z: "+array2);
      
      // console.log([{
      //   name: targetSensor+".x",
      //   data:array0
      // },
      // {
      //   name:targetSensor+".y",
      //   data:array1
      // },
      // {
      //   name:targetSensor+".z",
      //   data:array2
      // }]);
    })
    return([{
      name: targetSensor+".x",
      data:array0
    },
    {
      name:targetSensor+".y",
      data:array1
    },
    {
      name:targetSensor+".z",
      data:array2
    }]);
  }
}