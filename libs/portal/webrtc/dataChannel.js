"use strict"

/*

*/
let receivedDatacontrol = 'None';

export function messageEventHandler(event, buffer, spatialVideo) {
  console.log("get datachannel message")
  console.log("datachannel event:",event)

  //dataChannel.onmessage = onReceiveMessageCallback;

  let nowMsg = 'None';

  const message = event.data;

  if (message === 'RGB segment') {
    //console.log('RGB segment')
    receivedDatacontrol = 'RGB segment'
    nowMsg = 'None';
  }
  else if (message === 'RGB-gathering-done') {
    //console.log('RGB gather done')
    receivedDatacontrol = 'RGB-gathering-done'
    nowMsg = 'None';
  }
  else if (message === 'Depth segment') {
    receivedDatacontrol = 'Depth segment'
    nowMsg = 'None';
  }
  else if (message === 'Depth-gathering-done') {
    receivedDatacontrol = 'Depth-gathering-done'
    nowMsg = 'None';
  }
  else if (message === 'Sensor data') {
    receivedDatacontrol = 'Sensor data'
    nowMsg = 'None';
  }
  else {
    nowMsg = 'Data';
  }

  //jpeg to texture
  if (receivedDatacontrol === 'RGB-gathering-done' && nowMsg === 'None') {
    //const compressedByteArray = nd(new Uint8Array(message), [720, 1280, 4]);

    console.log('RGB for depth gathered done');
    console.log(buffer);

    // let receivedData = new Uint8Array(receivedSize);
    // let offset = 0;
    // for (let i = 0; i < receiveBuffer.length; i++) {
    //   receivedData.set(receiveBuffer[i], offset);
    //   offset += receiveBuffer[i].byteLength;
    // }

    // depthTypedArray = receivedData;

    const blob = new Blob(buffer, { type: 'image/jpeg' });
    spatialVideo.rgbSource.src = URL.createObjectURL(blob);
    //console.log('rgb done');
    buffer = []
    // receivedSize = 0;

  }
  else if (receivedDatacontrol === 'RGB segment' && nowMsg === 'Data') {
    console.log('RGB segment');
    buffer.push(message)
    // receivedSize += event.data.byteLength;
  }
  else if (receivedDatacontrol === 'RGB segment' && nowMsg === 'Data') {
    buffer.push(message)
    // receivedSize += event.data.byteLength;
  }
  else if (receivedDatacontrol === 'Depth segment' && nowMsg === 'Data') {
    console.log('Depth segment');
    buffer.push(message)
    // receivedSize += event.data.byteLength;
  }
  else if (receivedDatacontrol === 'Depth-gathering-done' && nowMsg === 'None') {
    console.log('Done for depth gathered');
    console.log(buffer);
    // let receivedData = new Uint8Array(receivedSize);
    // let offset = 0;
    // for (let i = 0; i < receiveBuffer.length; i++) {
    //   receivedData.set(receiveBuffer[i], offset);
    //   offset += receiveBuffer[i].byteLength;
    // }
    // depthTypedArray = receivedData;
    //console.log('depthTypedArray', receivedData);
    //console.log('typedRGB >>' , depthTypedArray);
    //console.log('typedDepth >>' , depthTypedArray);
    const blob = new Blob(buffer, { type: 'image/png' });
    spatialVideo.depthSource.src = URL.createObjectURL(blob);

    buffer = [];
    // receivedSize = 0;
  }
  else if (receivedDatacontrol === 'Sensor data' && nowMsg === 'Data') {
    //console.log('Done for Sensor data');
    console.log(message);
    const message_json = JSON.parse(message)
    let x, y, z, w;
    x = message_json.x;
    y = message_json.y;
    z = message_json.z;
    w = message_json.w;
    quaternion_from = { "x": x, "y": y, "z": z, "w": w, }
    //console.log('quaternion_from >>', quaternion_from)

  }
};

export function setDataChannel(dataChannel){
  dataChannel.binaryType = 'arraybuffer';
  dataChannel.onopen = onReceiveChannelStateChange;
  console.log("webrtc datachannel is set")
  return dataChannel
}

async function onReceiveChannelStateChange(dataChannel) {
  if (dataChannel) {
    const readyState = dataChannel.readyState;
    console.log(`Receive channel state is: ${readyState}`);
    if (readyState === 'open') {
      console.log('webRTC DataChannel Open!');
      //timestampStart = (new Date()).getTime();
      //timestampPrev2 = timestampStart;
      remoteVideo.dispatchEvent(new Event('play'));
      // onChannelOpen(); // defined in 3d_drawCPP.js 
      //statsInterval = setInterval(displayStats, 500);
      //await displayStats();
    }
  }
}


