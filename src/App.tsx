import React from 'react';
import { CartesianGrid, Scatter, ScatterChart, XAxis, YAxis, } from 'recharts';
import {
	SCATTER_FILL_COLOR,
	SCATTER_MARGIN,
	SCATTER_SIDE_LENGTH,
	VECTOR_MOCKUP
} from './constants/constants';
import { EScatterName } from './types/types';
import { Slider, SliderFilledTrack, SliderThumb, SliderTrack } from '@chakra-ui/slider';
import { Box } from '@chakra-ui/layout';
import './App.css';

export function App () {
	return (
		<div className={ 'app' }>
			{
				Object.values(EScatterName).map((name) => (
					<ScatterChart
						key={ name }
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
			<Slider
				defaultValue={ 0 }
				min={ 0 }
				max={ 100 }
				step={ 1 }
				onChangeEnd={ console.error }
			>
				<SliderTrack bg={ 'lightgrey' }>
					<Box
						position={ 'relative' }
						right={ 10 }
					/>
					<SliderFilledTrack bg="grey"/>
				</SliderTrack>
				<SliderThumb boxSize={ 4 }/>
			</Slider>
		</div>
	)
}
