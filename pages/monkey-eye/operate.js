import React, { useEffect, useState, Suspense } from 'react'
import dynamic from 'next/dynamic'

// import { Donut } from 'react-dial-knob'

const DynamicDonut = dynamic(() => import('react-dial-knob').then((mod)=>mod.Donut), {
  ssr: false
  
})

export default function DonutKnob() {
  const [render, setRender] = useState(false);  
  const [value, setValue] = useState(0);
  useEffect(()=>{
    setValue(1);
    setRender(true); 
  },[])


  // const knobComponents =[]
  // knobComponents.push(<Donut/>)  // for (const menu of menus){

  // }

  return (
    <>
        <DynamicDonut
          diameter={200}
          min={0}
          max={100}
          step={1}
          value={value}
          theme={{
            donutColor: 'blue'
          }}
          onValueChange={setValue}
          ariaLabelledBy={'my-label'}
        >
                <label id={'my-label'}>Some label</label>
        </DynamicDonut>

      {/* {knobComponents} */}
    {/* {render && (
    <Donut
        diameter={200}
        min={0}
        max={100}
        step={1}
        // value={value}
        value={80}
        theme={{
            donutColor: 'blue'
        }}
        onValueChange={setValue}
        ariaLabelledBy={'my-label'}
    >
        <label id={'my-label'}>Some label</label>
    </Donut>
    )} */}
    </>
  )
}