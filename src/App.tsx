import React from 'react';
import {
	ScatterChart,
	Scatter,
	XAxis,
	YAxis,
	CartesianGrid,
} from 'recharts';


const data = [
	{ x: 100, y: 200 },
	{ x: 120, y: 100 },
	{ x: 170, y: 300 },
	{ x: 140, y: 250 },
	{ x: 150, y: 400 },
	{ x: 400, y: 280 }
];

export default function App() {
	return (
		<ScatterChart
			width={ 400 }
			height={ 400 }
			margin={ {
				top: 20,
				right: 20,
				bottom: 20,
				left: 20,
			} }
		>
			<CartesianGrid/>
			<XAxis type="number" dataKey="x"/>
			<YAxis type="number" dataKey="y"/>
			<Scatter name="A school" data={ data } fill="#8884d8"/>
		</ScatterChart>
	);
}
