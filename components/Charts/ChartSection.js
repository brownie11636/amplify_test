import React from 'react';
import LineChart from './NivoLineChart'

export default function ChartSection(props){
    return(
        <div>
            <div style={{height:500}}>
                <LineChart/>
            </div>
        </div>
    )
}