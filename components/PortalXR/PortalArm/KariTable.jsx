import { useEffect, useRef } from "react"
import * as THREE from 'three'
import { Box } from '@react-three/drei'

import Model from "../components/Model"

// import Box from './boxes'
// const DEG2RAD = THREE.MathUtils.DEG2RAD;
// const RAD2DEG = THREE.MathUtils.RAD2DEG;

export default function KariTable({loader, children, ...props}){
  // const modelConfig = {
  //   path: "/3d_models/portalarm/UR5e_ver/table/GLTFs/table.gltf",
  //   matParams: {
  //     color: 0xc5c5c5,
  //     transparent: true,
  //     opacity: 0.5,
  //     side: THREE.DoubleSide,
  //     flatShading: true,
  //   }
  // }

  // const model = useLoader(STLLoader,'/3d_models/portalarm/UR5e_ver/table/STLs/table.STL')
  // console.log(model)

  const ref = useRef();

  useEffect(() => {

    return () => {

    }
  },[])


  return (
    <group ref={ref} >
      <Box args={[0.23, 0.935, 0.23]} position={[0, 0.935/2, 0]} material-wireframe />
      <Box args={[0.23, 0.935, 0.23]} position={[0, 0.935/2, 0]} material-color="gray" material-transparent material-opacity={0.5} />

      <Box args={[0.51, 0.935, 0.67]} position={[0, 0.935/2, -(0.23 + 0.67)/2]} material-wireframe />
      <Box args={[0.51, 0.935, 0.67]} position={[0, 0.935/2, -(0.23 + 0.67)/2]} material-color="gray" material-transparent material-opacity={0.5} >  
        
        <Box args={[0.08, 0.445 * 2, 0.04]} position={[0, 0.935/2, -0.065-0.67/2]} material-wireframe />
        <Box args={[0.08, 0.445 * 2, 0.04]} position={[0, 0.935/2, -0.065-0.67/2]} material-color="gray" material-transparent material-opacity={0.5} >

          <Box args={[0.045, 0.045, 0.16]} position={[0, 0.445, 0.16/2]} material-wireframe />
          <Box args={[0.045, 0.045, 0.16]} position={[0, 0.445, 0.16/2]} material-color="gray" material-transparent material-opacity={0.5} >
          </Box>

        </Box> 

      </Box> 
      {children}
    </group>
  )
}


