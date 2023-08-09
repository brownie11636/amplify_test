import * as THREE from 'three'
import { forwardRef, useState, useEffect } from 'react'

const Model = forwardRef( function Model ({loader, modelConfig, position=[0,0,0], rotation=[0,0,0], ...props}, forwardedRef) {

  const path = modelConfig.path
  const [geo,setGeo] = useState(new THREE.BufferGeometry);

  useEffect(()=>{
    // console.log("modelConfig")
    // console.log(modelConfig)
    const loadGLTF = async () => {
      // console.log("paaaaaath",path)
      let gltf = await loader.loadAsync(path);
      setGeo((geo_) => geo_ = gltf.scene.children[0].geometry) ;
    }

    // const loadGLTF =  () => {
    //   console.log("paaaaaath",path)
    //   // let gltf =  
    //   loader.load(path,(gltf) =>{
    //     setGeo((geo_) => geo_ = gltf.scene.children[0].geometry) ;
    //   } 
    //   );
    // 

    loadGLTF();

    // console.log("model loaded")
    
  },[])

  return (
    <group ref={forwardedRef} position={position} rotation={rotation} >
      <mesh >    
     {/* <group > */}
      {/* <mesh ref={forwardedRef} position={position} rotation={rotation} > */}
        {/* <primitive object={gltf.scene.children[0].geometry} attach="geometry"/> */}
        <primitive object={geo} attach="geometry"/>
        <meshPhongMaterial {...modelConfig.matParams} />
      </mesh>
      {props.children}
    </group>
  );
});

export { Model as default };
