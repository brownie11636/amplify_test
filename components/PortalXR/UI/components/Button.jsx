import { useRef, useEffect, forwardRef } from "react"
import { useInteraction } from '@react-three/xr'

// export default function Button({textContent, onClick, stateAttribute, children, ...props}){
//   const buttonRef = useRef();
//   //XR button Click
//   useInteraction(buttonRef,"onHover",()=>buttonRef.current.setState("hovered"))
//   useInteraction(buttonRef,"onBlur",()=>buttonRef.current.setState("idle"))
//   useInteraction(buttonRef,"onSelectStart",()=>buttonRef.current.setState("selected"))
//   useInteraction(buttonRef,"onSelectEnd",(e)=>{
//     console.log(e)
//     // e.stopPropagation()
//     buttonRef.current.setState("hovered")
//     console.log("swicthMode button clicked")
//     // onClick()
//     onClick()
//     // button.current.frame.layers.set(0)})
//   });
  
//   useEffect(()=>{
//     console.log(stateAttribute)
//     buttonRef.current.setupState(stateAttribute.idle)
//     buttonRef.current.setupState(stateAttribute.hovered)
//     buttonRef.current.setupState(stateAttribute.selected)
//     if(stateAttribute.active){
//       buttonRef.current.setupState(stateAttribute.active)
//     }
//     buttonRef.current.setState("idle")
//     return () => {
//       console.log(textContent + " button unmounted")
//     }
//   },[])
//   return (
//     <block ref={buttonRef}
//       args={props.args}
//       onPointerEnter={() => buttonRef.current.setState('hovered')}
//       onPointerLeave={() => buttonRef.current.setState('idle')}
//       onPointerDown={() => buttonRef.current.setState('selected')}
//       onPointerUp={(e) => {
//         e.stopPropagation();
//         buttonRef.current.setState('hovered')
//         onClick()
//       }}
//       {...props}
//     >
//       <text content={textContent}/>
//       {children}
//     </block>
//   )
// }

const Button = forwardRef(function Button({textContent, onClick, stateAttribute, children, ...props},buttonRef){
  if (!buttonRef) buttonRef = useRef();
  // buttonRef.current ={ ...buttonRef.current, isActive:false };
  // console.log(buttonRef)
  function setInactiveState(state){
    // console.log(buttonRef.current.isActive)
    if ( stateAttribute.active && buttonRef.current.isActive === true ) {
      buttonRef.current.setState("active")
    } else buttonRef.current.setState(state);
  }
  //XR button Click
  useInteraction(buttonRef,"onHover",()=>buttonRef.current.setState("hovered"))
  // useInteraction(buttonRef,"onBlur",()=>buttonRef.current.setState("idle"))
  useInteraction(buttonRef,"onBlur",() => setInactiveState("idle"))
  // useInteraction(buttonRef,"onBlur",() => {
  //   if ( stateAttribute.active && buttonRef.current.isActive === true ) {
  //     buttonRef.current.setState("active")
  //   } else buttonRef.current.setState("idle");
  // })
  useInteraction(buttonRef,"onSelectStart",()=>buttonRef.current.setState("selected"))
  useInteraction(buttonRef,"onSelectEnd",(e)=>{
    console.log(e)
    // e.stopPropagation()
    buttonRef.current.setState("hovered")
    console.log("swicthMode button clicked")
    // onClick()
    onClick()
    // button.current.frame.layers.set(0)})
  });
  
  useEffect(()=>{
    // console.log(stateAttribute)
    console.log(buttonRef)
    buttonRef.current.isActive=false
    buttonRef.current.setupState(stateAttribute.idle)
    buttonRef.current.setupState(stateAttribute.hovered)
    buttonRef.current.setupState(stateAttribute.selected)
    if(stateAttribute.active){
      buttonRef.current.setupState(stateAttribute.active)
    }
    buttonRef.current.setState("idle")
    return () => {
      console.log(textContent + " button unmounted")
    }
  },[])
  return (
    <block ref={buttonRef}
      args={props.args}
      onPointerEnter={() => buttonRef.current.setState('hovered')}
      // onPointerLeave={() => buttonRef.current.setState('idle')}
      onPointerLeave={()=>setInactiveState('idle')}
      // onPointerLeave={() => {
      //   if ( stateAttribute.active && buttonRef.current.isActive === true ) {
      //     buttonRef.current.setState("active")
      //   } else buttonRef.current.setState("idle");
      // }}
      onPointerDown={() => buttonRef.current.setState('selected')}
      onPointerUp={(e) => {
        e.stopPropagation();
        buttonRef.current.setState('hovered')
        onClick()
      }}
      {...props}
    >
      <text content={textContent}/>
      {children}
    </block>
  )
})

export { Button as default };