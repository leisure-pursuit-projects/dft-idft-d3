import React, { useState } from 'react';
import { CartesianGrid, Scatter, ScatterChart, XAxis, YAxis } from 'recharts';
import { SCATTER_FILL_COLOR, SCATTER_MARGIN, SCATTER_SIDE_LENGTH, VECTOR_MOCKUP } from './constants/constants';
import { FFTType } from './types/types';
import './App.css';
import { Slider, SliderFilledTrack, SliderThumb, SliderTrack } from '@chakra-ui/slider';
import { Button } from '@chakra-ui/button';
import { Box } from '@chakra-ui/layout';
import { FFT } from './fft/fft';
import { transformComplexVector } from './helpers/transformComplexVector';

export function App() {
	const [lossPercent, setLossPercent] = useState(0);
	const [scatterData, setScatterData] = useState(VECTOR_MOCKUP);
	// const [wasmGreeting, setWasmGreeting] = useState('');
	// const [wasmLoadStatus, setWasmLoadStatus] = useState<boolean | 'failed'>(false);
	//
	// const handleClick = () => {
	// 	const wasm = getWasmLibIsLoaded();
	// 	if (wasm) {
	// 		setWasmGreeting(wasm.get_greeting());
	// 	}
	// };
	//
	// useEffect(() => {
	// 	const waitForWasm = async () => {
	// 		const {promise} = getGlobalWasmState();
	// 		await promise;
	// 		const {failedToLoad} = getGlobalWasmState();
	// 		setWasmLoadStatus(failedToLoad ? 'failed' : true);
	// 	};
	// 	waitForWasm().catch(console.error);
	// }, []);

	const handleClick = () => {
		const fft = transformComplexVector(FFT([0, 1, 2, 1 ,1, 2, 1, 1]));
		setScatterData(fft);
	};

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
		<Button
			// disabled={ wasmLoadStatus === false || wasmLoadStatus === 'failed' }
			onClick={ handleClick }
		>
			Generate new vector
		</Button>
	)

	return (
		<div className={ 'app' }>
			{
				Object
					.values(FFTType)
					.map((name) => (
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
									data={ scatterData }
									fill={ SCATTER_FILL_COLOR }
								/>
							</ScatterChart>
							<p>
								{ name }
							</p>
							{ name === 'FFT' ? BUTTON : SLIDER }
						</div>
					))
			}
		</div>
	)
}
