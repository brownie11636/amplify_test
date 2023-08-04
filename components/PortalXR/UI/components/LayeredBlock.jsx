import {useRef, useEffect} from "react"
import { useFrame } from "@react-three/fiber"

import { useModeStore } from "/store/zustand/mode.js"

export default function LayeredBlock({layer, ...props}) {
  const ref = useRef();
  const layerRef = useRef(useModeStore.getState().controllerMode === layer ? 0: 3);

  useEffect(()=>{
    const unsubModeStore = useModeStore.subscribe(
      (state, prevState) => {
        // console.log(state)
        // console.log(prevState)

        if(state.controllerMode === layer) layerRef.current = 0; //visible and interactive
        // else layerRef.current = 1;  //layer 1, 2 is half-visible(left, right) in VR
        else layerRef.current = 3;  //invisible and non interactive

        ref.current.traverse((obj3d)=>obj3d.layers.set(layerRef.current))

    })

    // ref.current.traverse((obj3d)=>obj3d.layers.set(layerRef.current))
    // ref.current.addAfterUpdate(() => {
    //   // ref.current.traverse((obj3d)=>obj3d.layers.set(layerRef.current))
    // })

    
    return ()=> {
      unsubModeStore()
    }
  },[])

  let i=0
  useFrame(() =>{
    if(i<50){
      ref.current.traverse((obj3d)=>obj3d.layers.set(layerRef.current))
      i++
    }
  })

  return(
    <block ref={ref} 
      // args={[{width:2.5, height:2, backgroundOpacity:0,borderOpacity:1,borderWidth:0.02,borderColor:color.black}]} 
      // args={props.args}
      {...props}
    >
      {/* {props.children} */}
    </block>
  )
}