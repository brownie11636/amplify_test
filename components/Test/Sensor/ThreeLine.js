import React from 'react';
import dynamic from "next/dynamic";

const ResponsiveScatterPlot = dynamic(() => import("@nivo/scatterplot").then(m => m.ResponsiveScatterPlot), { ssr: false });
const axisBottom={
  orient: 'bottom',
  tickSize: 5,
  tickPadding: 5,
  tickRotation: 0,
  legend: 'time',
  legendPosition: 'middle',
  legendOffset: 46
};
const axisLeft = {
  orient: 'left',
  tickSize: 5,
  tickPadding: 5,
  tickRotation: 0,
  legend: 'value',
  legendPosition: 'middle',
  legendOffset: -60
};
const legend = [
  {
      anchor: 'bottom-right',
      direction: 'column',
      justify: false,
      translateX: 130,
      translateY: 0,
      itemWidth: 100,
      itemHeight: 12,
      itemsSpacing: 5,
      itemDirection: 'left-to-right',
      symbolSize: 12,
      symbolShape: 'circle',
      effects: [
          {
              on: 'hover',
              style: {
                  itemOpacity: 1
              }
          }
      ]
  }
];

export default function App(props) {
  return (
    <div style={{ width: '100%', height: 'auto', margin: '0 auto' }}>
      <div style={{ width: '100%', height: '250px', margin: '0 auto' }}>
        <ResponsiveScatterPlot 
          data={props.data.x}
          margin={{ top: 10, right: 140, bottom: 70, left: 90 }}
          xScale={{ type: 'linear', min: 'auto', max: 'auto' }}
          xFormat=">-.2f"
          yScale={{ type: 'linear', min: 'auto', max: 'auto' }}
          yFormat=">-.2f"
          blendMode="multiply"
          nodeSize={8}
          axisTop={null}
          axisRight={null}
          axisBottom={axisBottom}
          axisLeft={axisLeft}
          legends={legend}
        />
      </div>
      <div style={{ width: '100%', height: '250px', margin: '0 auto' }}>
        <ResponsiveScatterPlot 
          data={props.data.y}
          margin={{ top: 10, right: 140, bottom: 70, left: 90 }}
          xScale={{ type: 'linear', min: 'auto', max: 'auto' }}
          xFormat=">-.2f"
          yScale={{ type: 'linear', min: 'auto', max: 'auto' }}
          yFormat=">-.2f"
          colors={{ scheme: 'category10' }}
          blendMode="multiply"
          nodeSize={8}
          axisTop={null}
          axisRight={null}
          axisBottom={axisBottom}
          axisLeft={axisLeft}
          legends={legend}
        />
      </div>
      <div style={{ width: '100%', height: '250px', margin: '0 auto' }}>
        <ResponsiveScatterPlot 
          data={props.data.z}
          margin={{ top: 10, right: 140, bottom: 70, left: 90 }}
          xScale={{ type: 'linear', min: 'auto', max: 'auto' }}
          xFormat=">-.2f"
          yScale={{ type: 'linear', min: 'auto', max: 'auto' }}
          yFormat=">-.2f"
          colors={{ scheme: 'accent' }}
          blendMode="multiply"
          nodeSize={8}
          axisTop={null}
          axisRight={null}
          axisBottom={axisBottom}
          axisLeft={axisLeft}
          legends={legend}
        />
      </div>
    </div>
  );
}