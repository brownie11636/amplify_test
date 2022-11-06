import React, { useEffect, useState, Suspense } from 'react'
import dynamic from 'next/dynamic'

// import { Donut } from 'react-dial-knob'

const DynamicDonut = dynamic(() => import('react-dial-knob').then((mod)=>mod.Donut), {
  ssr: false
})

export default function Indicator(props) {
  const [render, setRender] = useState(false);  
  const [value, setValue] = useState(0);
  useEffect(()=>{
    setValue(props.value);
    setRender(true); 
  },[])

  // const onValueChange = (newVal) => {
  //   setValue(newVal);
  //   props.onChange(newVal);
  //   console.log("changed")
  // }

  return (
    <div className="single-knob-indicator">
      <DynamicDonut
        diameter={80}
        min={0}
        max={100}
        step={1}
        value={value}
        theme={{
          donutColor: 'yellow',
          bgrColor: "gray",
          maxedBgrColor: "red",
          centerColor: "#1c1945",
          centerFocusedColor: "#13112e",     
          donutThickness: 3
        }}
        // onValueChange={onValueChange}
        ariaLabelledBy={'my-label'}
      >
              <label id={'my-label'}>{props.label}</label>
      </DynamicDonut>
    </div>
  )
}