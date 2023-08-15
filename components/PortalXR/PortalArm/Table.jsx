import _ from "lodash"
import * as THREE from 'three'

import Model from "../components/Model"

// import Box from './boxes'
// const DEG2RAD = THREE.MathUtils.DEG2RAD;
// const RAD2DEG = THREE.MathUtils.RAD2DEG;

export default function Table({loader, children, ...props}){
  const modelConfig = {
    path: "/3d_models/portalarm/UR5e_ver/table/GLTFs/table.gltf",
    matParams: {
      color: 0xc5c5c5,
      transparent: true,
      opacity: 0.5,
      side: THREE.DoubleSide,
      flatShading: true,
    }
  }

  // const model = useLoader(STLLoader,'/3d_models/portalarm/UR5e_ver/table/STLs/table.STL')
  // console.log(model)


  return (
    <Model loader={loader} modelConfig={modelConfig} {...props}>
      {children}
    </Model>
    // <group {...props}>
    //   <mesh >    
    //     <primitive object={model} attach="geometry"/>
    //     <meshPhongMaterial {...modelConfig.matParams} />
    //   </mesh>
    //   {children}
    // </group>
  )
}


