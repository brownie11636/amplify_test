import dynamic from 'next/dynamic'
import * as THREE from 'three'
import { Suspense, useEffect, useState, useMemo, useRef } from 'react'
import { Canvas, useThree, useFrame, useLoader } from '@react-three/fiber'
import { OrbitControls, Preload, Html } from '@react-three/drei'
import { VRButton, ARButton, XR, Controllers, Hands, useController } from '@react-three/xr'
import { PCDLoader } from 'three/addons/loaders/PCDLoader.js';
import styles from "./Scene.module.css"
import { Leva, useControls } from 'leva'
import 'bootstrap/dist/css/bootstrap.css';


const Blob = dynamic(() => import('./Blob'), { ssr: false })
const RobotArm = dynamic(() => import('./Robot_arm'), { ssr: false })

export default function Scene(props) {

  // ------- PCD datachannel
  const [PCD, setPCD] = useState();
  // const point = props.PCD.current;

  // const result = useLoader(PCDLoader, '../Zaghetto.pcd');
  // const loader = new PCDLoader();
  // loader.load(
  //   // resource URL
  //   '../Zaghetto.pcd',
  //   // called when the resource is loaded
  //   function ( points ) {
  
  //     console.log('done!');
  //   },
  //   // called when loading is in progresses
  //   function ( xhr ) {
  
  //     console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
  
  //   },
  //   // called when loading has errors
  //   function ( error ) {
  
  //     console.log( 'An error happened', error);
  
  //   }
  // );


  const receiveData = () => {
    console.log('scene>>>', props.PCD.current);
  }

  // -----------------------


  // Everything defined in here will persist between route changes, only children are swapped

  useEffect( () => {

    // console.log('in scene >>', props.PCD);
  }, []);

  const options = useMemo(() => {
    return {
      rotX: { value: 0, min: -3.14, max: 3.14, step: 0.1 },
      rotY: { value: 0, min: -3.14, max: 3.14, step: 0.1 },
      rotZ: { value: 0, min: -3.14, max: 3.14, step: 0.1 },
    }
  })

  const armRot = [];
  for (let i = 0; i < 7; i++) {
    if (i === 0) armRot[i] = useControls('base', options);
    else armRot[i] = useControls(`Arm ${i - 1}`, options);
  }

  const [isAR, setIsAR] = useState(' ');
  const [isVR, setIsVR] = useState(' ');
  const [isWeb, setIsWeb] = useState(' ');


  async function checkXR() {
    // if(navigator.xr == undefined) setIsWeb('just web');
    // let isAR = await navigator.xr.isSessionSupported( 'immersive-ar');
    // if(isAR) setIsAR('webAR');
    // let isVR = await navigator.xr.isSessionSupported( 'immersive-vr');
    // if(isVR) setIsVR('webVR');
    // console.log(navigator.xr);
    // console.log(navigator);
  }
  // const [vid, setVid] = useState([]);
  // const [] = useState(() => {
  //   setVid(document.getElementById('remotevideo'));
  //   return vid;
  // });

  useEffect(() => {
    //setVid(document.getElementById('remotevideo'));
  }, [])

  return (
    <>
      <div className={styles.canvasContainer}>
        <VRButton />
        <Canvas>
          <XR>
            <directionalLight intensity={0.75} />
            <ambientLight intensity={0.75} />
            <Suspense fallback={null}>
              <Environment />
            </Suspense>

            <Controllers />
            <Hands />

            <mesh rotation={[0, 0, 0]} position={[0.3, 1.2, -2]}>
              <planeGeometry args={[4.2, 2.9]} />
              {/* <meshStandardMaterial emissive={"black"} side={THREE.DoubleSide}>
                <videoTexture attach="map" args={[vid]} />
              </meshStandardMaterial> */}
            </mesh>
            {/* <Blob route='/' position-y={-0.75} /> */}
            {/* <Suspense fallback={null}> */}
            <RobotArm armRot={armRot} />
            {/* </Suspense> */}
            <Preload all />
            <OrbitControls />
            {/* <VideoText position={[0, 1.3, -2]} />      */}
          </XR>
        </Canvas>
        <Leva />
      </div>
      <button onClick={receiveData}>check recevice point-data</button>
    </>
  )
}

// https://github.com/pmndrs/react-three-fiber/discussions/1240
function Environment() {
  const { scene } = useThree()
  // const texture = useLoader(THREE.CubeTextureLoader,[
  //   'https://threejs.org/manual/examples/resources/images/grid-1024.png',
  //   'https://threejs.org/manual/examples/resources/images/grid-1024.png',
  //   'https://threejs.org/manual/examples/resources/images/grid-1024.png',
  //   'https://threejs.org/manual/examples/resources/images/grid-1024.png',
  //   'https://threejs.org/manual/examples/resources/images/grid-1024.png',
  //   'https://threejs.org/manual/examples/resources/images/grid-1024.png'
  // ])
  const loader = new THREE.CubeTextureLoader();
  const texture = loader.load([
    'https://threejs.org/manual/examples/resources/images/grid-1024.png',
    'https://threejs.org/manual/examples/resources/images/grid-1024.png',
    'https://threejs.org/manual/examples/resources/images/grid-1024.png',
    'https://threejs.org/manual/examples/resources/images/grid-1024.png',
    'https://threejs.org/manual/examples/resources/images/grid-1024.png',
    'https://threejs.org/manual/examples/resources/images/grid-1024.png',
  ]);
  // texture.mapping = THREE.EquirectangularReflectionMapping
  texture.encoding = THREE.sRGBEncoding

  scene.background = texture
  return null
}

