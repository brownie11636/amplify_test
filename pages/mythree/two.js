import ReactDOM from 'react-dom'
import { Canvas, useFrame } from '@react-three/fiber'
import { useRef, useState, Suspense } from 'react'
import { useAspect, useVideoTexture, useTexture } from '@react-three/drei'

import RTCvideo2 from '../../components/Services/VideoPanel2';

export default function Mythree2() {

    const [cubeCnt, setCubeCnt] = useState(1);
    const [window, setWindow] = useState(1);

    
    const objects = [];

    // if (window === 1) {
    //     for (let i = 0; i < cubeCnt ; i++) {
    //         objects.push(
    //             <Cube rotateCoef={null} position={i*(1.5)} setCubeCnt={setCubeCnt}/>
    //         );        
    //     }
    //     if (cubeCnt === 1) {
    //         window === window + 2;
    //     }
    // } else if (window === 3) {
    //     for (let i = 0; i < cubeCnt ; i++) {
    //         objects.push(
    //             <Cube rotateCoef={null} position={i*(1.5)} setCubeCnt={setCubeCnt}/>
    //         );        
    //     }
    // }

    for (let i = 0; i < cubeCnt ; i++) {
        objects.push(
            <Cube rotateCoef={null} position={i*(1.5)} setCubeCnt={setCubeCnt}/>
        );        
    }


    return (
        <div style={{ width: "100vw", height: "100vh" }}>
            <Canvas flat linea>
                <ambientLight intensity={0.1} />
                <directionalLight color="blue" position={[0, 0, 5]} />
                {objects}
                <Scene />
            </Canvas>
            
        </div>
    )
}

function Scene() {
    const size = useAspect(1800, 1000)
    return (
      <mesh scale={size}>
        <planeGeometry />
        <Suspense fallback={<FallbackMaterial url="/10.jpg" />}>
          <VideoMaterial url="/drei.mp4" />
        </Suspense>
      </mesh>
    )
  }

function VideoMaterial({ url }) {
    const texture = useVideoTexture(url)
    return <meshBasicMaterial map={texture} toneMapped={false} />
  }
  
  function FallbackMaterial({ url }) {
    const texture = useTexture(url)
    return <meshBasicMaterial map={texture} toneMapped={false} />
  }
  


const Cube = (props) => {

    let rotateCoef = props.rotateCoef;
    let position = props.position;
    
    const func = () => {
        props.setCubeCnt((current) => current +1 );
    }

    const mesh = useRef(null);

    useFrame(({clock}) => {
        mesh.current.rotation.x = clock.getElapsedTime();
        mesh.current.rotation.y = clock.getElapsedTime();
        mesh.current.rotation.z = clock.getElapsedTime();
    })

    const objects = [];


    return (
        <>
            <mesh
                key={Math.random()}
                ref={mesh}
                position={[0, position, 0]}
                onClick={func}
            >
                <boxGeometry args={[1, 1, 1]} />
                <meshNormalMaterial />
            </mesh>
        </>
    )

}