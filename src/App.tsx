import React, { useState } from 'react';
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
import { Button } from '@chakra-ui/react';
import './App.css';

export function App () {
	const [lossPercent, setLossPercent] = useState(0);

	const SLIDER = (
		<>
			<Slider
				defaultValue={ lossPercent }
				min={ 0 }
				max={ 100 }
				step={ 1 }
				onChangeEnd={ setLossPercent }
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
			<p>{ `Loss value is set to ${ lossPercent }%` }</p>
		</>
	)

	const BUTTON = (
		<Button onClick={ console.error }>
			Generate new vector
		</Button>
	)

	return (
		<div className={ 'app' }>
			{
				Object.values(EScatterName).map((name) => (
					<div
						key={ name }
						className={ 'scatter-chart-container' }
					>
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
						<p>
							{ name }
						</p>
						{ name === 'DFT' ? BUTTON : SLIDER }
					</div>
				))
			}
		</div>
	)
}
