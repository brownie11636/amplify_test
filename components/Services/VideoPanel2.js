import React, { useEffect, useRef, useState } from "react";

export default function RTCvideo2(props) {

  const videoStream = useRef(undefined);
  const setStream = (stream) => {
      props.setStream(stream); 
  }


  console.log('props.stream?', props);

  
  useEffect( () => {
    // if(videoStream.current !== undefined)
    //   videoStream.current.srcObject=props.stream.srcObject;

    try {
      videoStream.current.srcObject=props.stream.srcObject;

    } catch (e) {
      // do nothing.
    }
    setStream(videoStream.current);
  }, [props])

  return (
    <>
    <video
        id="remotevideo"
        style={{
          width: 400,
          height: 400,
          margin: 5,
          backgroundColor: "black",
        }}
        ref={videoStream}
        autoPlay
      />
    </>
  );
}
