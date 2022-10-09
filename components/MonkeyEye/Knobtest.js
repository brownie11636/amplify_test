import React, { useEffect, useState, Suspense } from 'react'
import dynamic from 'next/dynamic'

// import { Donut } from 'react-dial-knob'

const DynamicDonut = dynamic(() => import('react-dial-knob').then((mod)=>mod.Donut), {
  ssr: false
})

export default function DonutKnob(props) {
  const [render, setRender] = useState(false);  
  const [value, setValue] = useState(0);
  useEffect(()=>{
    setValue(props.value);
    setRender(true); 
  },[])

  const onValueChange = (newVal) => {
    setValue(newVal);
    props.onChange(newVal);
    console.log("changed")
  }

  return (
    <>
      <DynamicDonut
        diameter={150}
        min={0}
        max={100}
        step={1}
        value={value}
        theme={{
          donutColor: 'blue'
        }}
        onValueChange={onValueChange}
        ariaLabelledBy={'my-label'}
      >
              <label id={'my-label'}>{props.label}</label>
      </DynamicDonut>
    </>
  )
}