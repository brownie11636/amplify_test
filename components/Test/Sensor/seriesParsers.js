
export default function parser(packet, parser_id){
    if(parser_id=="1q2w3e4r"){
        return parser_1q2w3e4r(packet);
    }
  }

const parser_1q2w3e4r = (packet)=>{
    let array0=[];
    let array1=[];
    let array2=[];
    let hexArray;

    let targetSensor="dummy";
    packet.forEach((e,i)=>{
        console.log(e.payload); 
        hexArray = e.payload.split("").map(char => parseInt(char.charCodeAt(0),10));
        console.log(hexArray);
        hexArray.forEach((datum,idx)=>{
          if(idx%3 == 0){
            array0.push([i*20+idx,datum])
          }else if(idx%3 == 1){
            array1.push([i*20+idx,datum])
          }else if(idx%3 == 2){
            array2.push([i*20+idx,datum])
          }
        })
        return ([{
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
          }
        ])
        // console.log("\n"); 
        // console.log(hexArray.map(dec => dec.toString(16)));
        // console.log("\n"); 
    })
  };
  