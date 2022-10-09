import React, { useState } from 'react'
import { Donut } from 'react-dial-knob'

export default function DonutKnob() {
    // const [value, setValue] = useState(0)
    return <Donut
        diameter={200}
        min={0}
        max={100}
        step={1}
        // value={value}
        value={80}
        theme={{
            donutColor: 'blue'
        }}
        // onValueChange={setValue}
        ariaLabelledBy={'my-label'}
    >
        <label id={'my-label'}>Some label</label>
    </Donut>
}