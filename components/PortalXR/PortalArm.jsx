import * as THREE from 'three'
import { Suspense, useRef, useState, useMemo, useEffect} from 'react'
import { Canvas, useThree, useLoader, useFrame } from '@react-three/fiber'
// import { useXR } from '@react-three/xr'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import * as myGamepadInput from '../../libs/XR/myGamepadInput'
import { Kinematics } from '../../libs/kinematics_YS'


export default function PortalArm(type, path, ...props) {

  // const {
  //   // An array of connected `XRController`
  //   controllers,
  //   // Whether the XR device is presenting in an XR session
  //   isPresenting,
  //   // Whether hand tracking inputs are active
  //   isHandTracking,
  //   // A THREE.Group representing the XR viewer or player
  //   player,
  //   // The active `XRSession`
  //   session,
  //   // `XRSession` foveation. This can be configured as `foveation` on <XR>. Default is `0`
  //   foveation,
  //   // `XRSession` reference-space type. This can be configured as `referenceSpace` on <XR>. Default is `local-floor`
  //   referenceSpace
  // } = useXR();

  const armPos =  [0, 0.717, 0]
  const armGeometries = [
    [0, 0.0991, 0],
    [0, 0.0634, -0.0744],
    [0.425, 0, 0],
    [0.39225, 0, 0.0215],
    [0, -0.0463, -0.0804],
    [0, -0.0534, -0.0463],
  ];

  const gripperGeometries = [
    [0, 0, -0.0533],
    [0.01861, 0, -0.04739],
    [0.008, 0, -0.058],
    [0, 0, -0.05694],
    [0, 0, 0],
  ];

  const rotAxes = [
    [0, 1, 0],
    [0, 0, -1],
    [0, 0, -1],
    [0, 0, -1],
    [0, -1, 0],
    [0, 0, -1],
  ];

  // const loader = useRef(new GLTFLoader());
  const [loader, setLoader] = useState(new GLTFLoader())
  useEffect(() => {
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath("/three/examples/jsm/draco/")
    setLoader ((gltfLoader) => gltfLoader.setDRACOLoader(dracoLoader) );
  }, []);

  return(
    <Model loader={loader}/>
  )

}

const Model = ({loader, modelConfig, rotation, children, ...props}) => {
  // const path = "/3d_models/portalarm/UR5e_ver"
  // const dracoLoader = new DRACOLoader();
  // dracoLoader.setDecoderPath("/3d_models/dracoDeocoder")
  // const geo = useLoader(GLTFLoader, path + "/ALLZERO/UR5e/GLTFs/arm_0.gltf");
  const geo = useRef(new THREE.BufferGeometry);
  const ref = useRef();
  useEffect( () => {
    const path = "/3d_models/portalarm/UR5e_ver"
    loader.load(path + "/ALLZERO/UR5e/GLTFs/arm_0.gltf", (gltf) => [
      geo.current = gltf.scene.children[0],geometry
    ])
  })

  const loadModel = () =>{

  }
  // const {camera} = useThree();

  // useEffect(() => {
  //     camera.lookAt(ref.current.position);
  // });

  return (
    <group>

      <mesh ref={ref} position={(0,0,0)} >
        <primitive object={geo.current} attach="geometry"/>
        <meshPhongMaterial 
          color='#b0bef0'   //0xb0bef0로 쓰면 안됨
          specular='#111111' 
          shininess='200' 
          transparent 
          opacity='0.85' 
          />
        {children}
      </mesh>
    </group>
  );
};