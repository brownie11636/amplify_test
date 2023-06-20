import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Brush,
  AreaChart,
  Area,
  ResponsiveContainer,
} from 'recharts';

export default function App(props) {
  return (
    <div style={{ width: '100%' }}>

      <ResponsiveContainer width="100%" height={200}>
        <LineChart
          width={500}
          height={200}
          data={props.data}
          syncId="anyId"
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis />
          <YAxis />
          <Tooltip />
          <Line isAnimationActive={false} type="monotone" dataKey="x" stroke="#8884d8" fill="#8884d8" />
        </LineChart>
      </ResponsiveContainer>

      <ResponsiveContainer width="100%" height={200}>
        <LineChart
          width={500}
          height={200}
          data={props.data}
          syncId="anyId"
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis />
          <YAxis />
          <Tooltip />
          <Line isAnimationActive={false} type="monotone" dataKey="y" stroke="#82ca9d" fill="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>

      <ResponsiveContainer width="100%" height={200}>
        <LineChart
          width={500}
          height={200}
          data={props.data}
          syncId="anyId"
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis />
          <YAxis />
          <Tooltip />
          <Line isAnimationActive={false} type="monotone" dataKey="z" stroke="#FA8071" fill="#FA8071" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}