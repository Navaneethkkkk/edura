import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from 'recharts';

function Chart() {
  const data = [
    { name: 'Monday', uv: 400 },
    { name: 'Tuesday', uv: 300 },
    { name: 'Wednesday', uv: 400 },
    { name: 'Thursday', uv: 600 },
    { name: 'Friday', uv: 400 },
    { name: 'Saturday', uv: 400 },
  ];

  // Custom bar shape with drop shadow
  const ShadowBar = (props) => {
    const { x, y, width, height, fill } = props;
    return (
      <>
        <defs>
           
          <filter id="bar-shadow" x="-20%" y="-20%" width="140%" height="140% ">
            <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#8884d8" />
          </filter>
        </defs>
        <rect
          x={x}
          y={y}
          width={width}
          height={height}
          fill={fill}
          rx={6}
          ry={6}
          filter="url(#bar-shadow)"
        />
      </>
    );
  };

  return (
    <div style={{ padding: '20px' }}>
      <BarChart width={900} height={300} data={data}>
        {/* <CartesianGrid stroke="#ccc" strokeDasharray="5 5" /> */}
        <XAxis dataKey="name" stroke="#8884d8" />
        <YAxis />
        <Tooltip wrapperStyle={{ backgroundColor: '#f5f5f5' }} />
        <Bar
          dataKey="uv"
          fill="#8884d8"
          shape={<ShadowBar />}
          barSize={40}
        />
      </BarChart>
    </div>
  );
}

export default Chart;
