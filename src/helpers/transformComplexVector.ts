import { ComplexVector } from '../fft/fft';
import { ScatterComplexVector } from '../types/types';

export const transformComplexVector = (
	{ real, imag }: ComplexVector
): ScatterComplexVector => {
		const res: {
			x: number,
			y: number
		}[] = [];

		for (const item of real) {
			const i = real.indexOf(item);
			res.push({
				x: item,
				y: imag[i]
			})
		}

		return res
}