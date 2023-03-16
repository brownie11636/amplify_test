import dynamic from 'next/dynamic'
import * as THREE from 'three'
import { Suspense, useEffect, useState, useMemo, useRef } from 'react'
import { Canvas, useThree, useFrame, useLoader } from '@react-three/fiber'
import { OrbitControls, Preload, Html, Box } from '@react-three/drei'
import { VRButton, ARButton, XR, Controllers, Hands, useController } from '@react-three/xr'
import { PCDLoader } from 'three/addons/loaders/PCDLoader.js';
import { meshPhongMaterial } from 'three';
import styles from "./Scene.module.css"
import { Leva, useControls } from 'leva'
import 'bootstrap/dist/css/bootstrap.css';

const path = require('path')

const Blob = dynamic(() => import('./Blob'), { ssr: false })
const RobotArm = dynamic(() => import('./Robot_arm'), { ssr: false })

// const pcdModel = () => {
//   const { scene } = useThree()

//   const result = useLoader(PCDLoader, path.join(__dirname, '/Zaghetto.pcd'));
//   return (
//     <mesh>
//       <primitive object={result} />
//     </mesh>
//   )
// }

const MyModel = () => {

  let pcd;
  const ref = useRef();

  const loader = new PCDLoader();
  loader.load(
    // resource URL
    '/Zaghetto.pcd',
    // called when the resource is loaded
    function (points) {

      console.log('done! \n point >>', points);
      pcd = points;
      //setpcd(points)
      return pcd

    },
    // called when loading is in progresses
    function (xhr) {

      console.log((xhr.loaded / xhr.total * 100) + '% loaded');

    },
    // called when loading has errors
    function (error) {

      console.log('An error happened', error);

    }
  );

  return (

    <mesh ref={ref} position={[1, 2, 1]}>
      <Suspense fallback={null}>

        <primitive object={pcd} />
        <meshPhongMaterial
          color='#b0bef0'   //0xb0bef0로 쓰면 안됨
          specular='#111111'
          shininess='200'
          transparent
          opacity='0.85'
        />
      </Suspense>
    </mesh>
  )
}


export default function PCDload(props) {

  // ------- PCD datachannel
  // const result = useLoader(PCDLoader, '/Zaghetto.pcd');


  // const pcd = useRef(null);


  const loader = new PCDLoader();
  loader.load(
    // resource URL
    '/Zaghetto.pcd',
    // called when the resource is loaded
    function (points) {

      console.log('done! \n point >>', points);
      pcd = points;
      //setpcd(points)
      return pcd

    },
    // called when loading is in progresses
    function (xhr) {

      console.log((xhr.loaded / xhr.total * 100) + '% loaded');

    },
    // called when loading has errors
    function (error) {

      console.log('An error happened', error);

    }
  );

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

  useEffect(() => {
    //setVid(document.getElementById('remotevideo'));
  }, [])

  return (
    <>
      <div className={styles.canvasContainer}>
        <VRButton />
        <Canvas>
          <XR>
            <Suspense fallback={null}>
              <Environment />
            </Suspense>
            <Box key="companionCube">
              <meshPhongMaterial color="#FFFFFF" />
            </Box>
            <OrbitControls />
          </XR>
        </Canvas>
        <Leva />
      </div>
    </>
  )
}

const Cube = (props) => {

  let rotateCoef = props.rotateCoef;
  let position = props.position;

  const func = () => {
    props.setCubeCnt((current) => current + 1);
  }

  const mesh = useRef(null);

  useFrame(({ clock }) => {
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



