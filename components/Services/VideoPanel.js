import * as THREE from 'three'
import React, { Suspense, useEffect, useState, useRef } from 'react'
// import { Canvas, useFrame } from '@react-three/fiber'
// import { Reflector, Text, useTexture, useGLTF, useAspect, useVideoTexture } from '@react-three/drei'

export default function RTCvideo(props) {

  return (
      // <Scene remoteVideoRef={null}/>
      <VideoText position={[0, 1.3, -2]} stream={props.stream} setStream={props.setStream}/>
  )
}

function VideoText(props) {
  const mesh = useRef();
  const videoStream = useRef(undefined);
  const setStream = (stream) => {
      console.log('props?', props);
      props.setStream(stream); 
  }

  useEffect( () => {
    try {
      videoStream.current.srcObject=props.stream.srcObject;
    } catch (e) {
      // do nothing.
    }
    setStream(videoStream.current);
  }, [props]);

  
  const [video] = useState(() => {
      const vid = document.createElement("video");
      vid.crossOrigin = "Anonymous";
      vid.loop = true;
      vid.muted = true;
      vid.play();
      vid.ref = videoStream;
      return vid;
  });
  //const [video] = useState(() => Object.assign(document.createElement('video'), { src: '/drei.mp4', crossOrigin: 'Anonymous', loop: true, muted: true }))
  return (
      <mesh rotation={[0, 0, 0]} position={[0, 0, 1.1]}>
          <planeGeometry args={[3.2, 1.9]} />
          <meshStandardMaterial emissive={"white"} side={THREE.DoubleSide}>
              <videoTexture attach="map" args={[video]} />
          </meshStandardMaterial>
      </mesh>
  )
}