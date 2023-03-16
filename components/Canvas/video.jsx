import * as THREE from 'three'
import React, { Suspense, useEffect, useState, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Reflector, Text, useTexture, useGLTF, useAspect, useVideoTexture } from '@react-three/drei'

import 'bootstrap/dist/css/bootstrap.css';


//--------------------------------

const videoPos = [0.1, 1, -1];
const VRVideoPos = new THREE.Vector3(videoPos[0], videoPos[1], videoPos[2]); // 로봇 최초 포지션 설정
const XRRatio = 0.4;   // real scale / virtual scale 




export default function MyVideo() {

    return (
        // <Scene remoteVideoRef={null}/>
        <VideoText position={[0, 1.3, -2]} />
    )
}

function VideoText(props) {
    const mesh = useRef();
    const remoteStream = useRef(undefined);

    const [video] = useState(() => {
        const vid = document.createElement("video");
        vid.src = '/drei.mp4';
        vid.crossOrigin = "Anonymous";
        vid.loop = true;
        vid.muted = true;
        vid.play();
        vid.ref = remoteStream;
        return vid;
    });
    //const [video] = useState(() => Object.assign(document.createElement('video'), { src: '/drei.mp4', crossOrigin: 'Anonymous', loop: true, muted: true }))
    return (
        <mesh rotation={[0, 0, 0]} position={[0, 0, 1.1]}>
            <planeGeometry args={[3.2, 1.9]} />
            <meshStandardMaterial emissive={"black"} side={THREE.DoubleSide}>
                <videoTexture attach="map" args={[video]} />
            </meshStandardMaterial>
        </mesh>
    )
}

const VideoTextureProps = {
    unsuspend: 'loadedmetadata',
    muted: true,
    loop: true,
    start: true,
    crossOrigin: 'Anonymous'
}

function Scene(props) {
    const size = useAspect(180, 100) //
    return (
        <group position={VRVideoPos} scale={XRRatio}>

            <mesh scale={size}>
                <planeGeometry />
                <Suspense fallback={<FallbackMaterial url="/10.jpg" />}>
                    {/* <VideoText position={[0, 1.3, -2]} /> */}
                    <VideoMaterial url={'/drei.mp4'} VideoTextureProps={{
                        muted: true,
                        loop: true,
                        start: true,
                        crossOrigin: 'Anonymous',
                        ref: null,
                    }
                    } />
                </Suspense>
            </mesh>
        </group>
    )
}




function VideoMaterial({ url, VideoTextureProps }) {
    const texture = useVideoTexture(url, VideoTextureProps)
    return <meshBasicMaterial map={texture} toneMapped={false} />
}

function FallbackMaterial({ url }) {
    const texture = useTexture(url)
    return <meshBasicMaterial map={texture} toneMapped={false} />
}