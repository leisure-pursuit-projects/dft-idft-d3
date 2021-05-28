import React from 'react';
import { CartesianGrid, Scatter, ScatterChart, XAxis, YAxis, } from 'recharts';
import {
	SCATTER_FILL_COLOR,
	SCATTER_MARGIN,
	SCATTER_SIDE_LENGTH,
	VECTOR_MOCKUP
} from './constants/constants';
import { EScatterName } from './types/types';


export default function App () {
	return (
		<>
			{
				Object.values(EScatterName).map((name) => (
					<ScatterChart
						width={ SCATTER_SIDE_LENGTH }
						height={ SCATTER_SIDE_LENGTH }
						margin={ {
							top: SCATTER_MARGIN,
							right: SCATTER_MARGIN,
							bottom: SCATTER_MARGIN,
							left: SCATTER_MARGIN,
						} }
					>
						<CartesianGrid/>
						<XAxis type="number" dataKey="x"/>
						<YAxis type="number" dataKey="y"/>
						<Scatter
							name={ name }
							data={ VECTOR_MOCKUP }
							fill={ SCATTER_FILL_COLOR }
						/>
					</ScatterChart>
				))
			}
		</>
	);
}
