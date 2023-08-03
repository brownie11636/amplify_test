import {useRef, useEffect} from "react"

import { useModeStore } from "/store/zustand/mode.js"

export default function LayeredBlock({layer, ...props}) {
  const ref = useRef();
  const layerRef = useRef(useModeStore.getState().controllerMode === layer ? 0: 1);

  useEffect(()=>{
    const unsubModeStore = useModeStore.subscribe(
      (state, prevState) => {
        // console.log(state)
        // console.log(prevState)
        ref.current.set({content:state}) // it should be maintained to evoke onAfterupdate callback of layeredBlock  
        if(state.controllerMode === layer) layerRef.current = 0; //visible and interactive
        else layerRef.current = 1;  //invisible and non interactive
    })

    // ref.current.traverse((obj3d)=>obj3d.layers.set(layerRef.current))
    ref.current.onAfterUpdate = () => {
      ref.current.traverse((obj3d)=>obj3d.layers.set(layerRef.current))
    }

    
    return ()=> {
      unsubModeStore()
    }
  },[])

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