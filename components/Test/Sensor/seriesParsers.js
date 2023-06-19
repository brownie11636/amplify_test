
export default function parser(packet, parser_id, targetSensor){

  if(parser_id=="1q2w3e4r") {
    let array0=[];
    let array1=[];
    let array2=[];
    let hexArray;

    packet.forEach((e,i)=>{
        // console.log(e.payload); 
        hexArray = e.payload.split("").map(char => parseInt(char.charCodeAt(0),10));
        // console.log("hexArray:"+hexArray);
        console.log("i:"+i);
        hexArray.forEach((datum,idx)=>{
          console.log(idx);
          if(idx%3 == 0){
            array0.push([i*192+idx,datum])
          }else if(idx%3 == 1){
            array1.push([i*192+idx,datum])
          }else if(idx%3 == 2){
            array2.push([i*192+idx,datum])
          }
        })
        console.log(array0);
        console.log([{
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