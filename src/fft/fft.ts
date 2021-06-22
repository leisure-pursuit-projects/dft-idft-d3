// Tweaking moonchanyong's typefft lib: https://github.com/moonchanyong/typefft

import { ComplexVectorValue, BaseComplexVector, HandleArray } from './complexVector';

// Math constants and functions we need.
const PI: number = Math.PI;
const SQRT1_2: number = Math.SQRT1_2;

export function FFT(
	input: HandleArray | number): ComplexVector {
	return ensureComplexArray(input).FFT();
}

export function InvFFT(input: HandleArray | number): ComplexVector {
	return ensureComplexArray(input).IFFT();
}

export function frequencyMap(
	input: HandleArray | number,
	filterer: (
		value: ComplexVectorValue,
		i: number,
		n: number,
	) => void): ComplexVector {

	return ensureComplexArray(input).frequencyMap(filterer);
}

export class ComplexVector extends BaseComplexVector {
	FFT(): ComplexVector {
		return fft(this, false);
	}

	IFFT(): ComplexVector {
		return fft(this, true);
	}

	// Applies a frequency-space filter to input, and returns the real-space
	// filtered input.
	// filterer accepts freq, i, n and modifies freq.real and freq.imag.
	frequencyMap(
		filterer: (
			value: ComplexVectorValue,
			i: number,
			n: number,
		) => void): ComplexVector {
		return this.FFT().map(filterer).IFFT();
	}
}

function ensureComplexArray(
	input: number | HandleArray,
): ComplexVector {
	return input instanceof ComplexVector && input || new ComplexVector(input);
}

function fft(
	input: ComplexVector,
	isInverse: boolean,
): ComplexVector {
	const n: number = input.length;

	if (n & (n - 1)) {
		FFT_Recursive(input, isInverse)
	}

	return FFT_2_Iterative(input, isInverse);
}

function FFT_Recursive(
	input: ComplexVector,
	inverse: boolean,
): ComplexVector {
	const n: number = input.length;

	if (n === 1) return input;

	const output: ComplexVector = new ComplexVector(n, input.ArrayType);

	// Use the lowest odd factor, so we are able to use FFT_2_Iterative in the
	// recursive transforms optimally.
	const p: number = LowestOddFactor(n);
	const m: number = n / p;
	const normalisation: number = 1 / Math.sqrt(p);
	let recursive_result = new ComplexVector(m, input.ArrayType);

	// Loops go like O(n Σ p_i), where p_i are the prime factors of n.
	// for a power of a prime, p, this reduces to O(n p log_p n)
	for (let j = 0; j < p; j++) {
		for (let i = 0; i < m; i++) {
			recursive_result.real[i] = input.real[i * p + j];
			recursive_result.imag[i] = input.imag[i * p + j];
		}
		// Don't go deeper unless necessary to save allocs.
		if (m > 1) {
			recursive_result = fft(recursive_result, inverse);
		}

		const del_f_r: number = Math.cos(2 * PI * j / n);
		const del_f_i: number = (inverse ? -1 : 1) * Math.sin(2 * PI * j / n);
		let f_r: number = 1;
		let f_i: number = 0;

		for (let i = 0; i < n; i++) {
			const _real: number = recursive_result.real[i % m];
			const _imag: number = recursive_result.imag[i % m];

			output.real[i] += f_r * _real - f_i * _imag;
			output.imag[i] += f_r * _imag + f_i * _real;

			[f_r, f_i] = [
				f_r * del_f_r - f_i * del_f_i,
				f_i = f_r * del_f_i + f_i * del_f_r,
			];
		}
	}

	// Copy back to input to match FFT_2_Iterative in-placeness
	// TODO: faster way of making this in-place?
	for (let i = 0; i < n; i++) {
		input.real[i] = normalisation * output.real[i];
		input.imag[i] = normalisation * output.imag[i];
	}

	return input;
}

function FFT_2_Iterative(
	input: ComplexVector,
	inverse: boolean,
): ComplexVector {
	const n: number = input.length;

	const output: ComplexVector = BitReverseComplexArray(input);
	const [output_r, output_i] = [output.real, output.imag];

	// Loops go like O(n log n): width ~ log n; i,j ~ n
	let width: number = 1;
	while (width < n) {
		const del_f_r: number = Math.cos(PI / width);
		const del_f_i: number = (inverse ? -1 : 1) * Math.sin(PI / width);
		let i: number = 0
		for (; i < n / (2 * width); ++i) {
			let f_r: number = 1;
			let f_i: number = 0;
			let j: number = 0;
			for (; j < width; j++) {
				const l_index = 2 * i * width + j;
				const r_index = l_index + width;

				const left_r = output_r[l_index];
				const left_i = output_i[l_index];
				const right_r = f_r * output_r[r_index] - f_i * output_i[r_index];
				const right_i = f_i * output_r[r_index] + f_r * output_i[r_index];

				output_r[l_index] = SQRT1_2 * (left_r + right_r);
				output_i[l_index] = SQRT1_2 * (left_i + right_i);
				output_r[r_index] = SQRT1_2 * (left_r - right_r);
				output_i[r_index] = SQRT1_2 * (left_i - right_i);

				[f_r, f_i] = [
					f_r * del_f_r - f_i * del_f_i,
					f_r * del_f_i + f_i * del_f_r,
				];
			}
		}
		width <<= 1;
	}

	return output;
}

function BitReverseIndex(
	index: number,
	n: number,
): number {
	let bitReversedIndex = 0;

	while (n > 1) {
		bitReversedIndex <<= 1;
		bitReversedIndex += index & 1;
		index >>= 1;
		n >>= 1;
	}
	return bitReversedIndex;
}

function BitReverseComplexArray(
	array: ComplexVector,
): ComplexVector {
	const n: number = array.length;
	const flips: Set<number> = new Set();

	for (let i = 0; i < n; i++) {
		const r_i: number = BitReverseIndex(i, n);

		if (flips.has(i)) continue;

		[array.real[i], array.real[r_i]] = [array.real[r_i], array.real[i]];
		[array.imag[i], array.imag[r_i]] = [array.imag[r_i], array.imag[i]];

		flips.add(r_i);
	}

	return array;
}

function LowestOddFactor(
	n: number,
): number {
	const sqrt_n: number = Math.sqrt(n);
	let factor: number = 3;

	while (factor <= sqrt_n) {
		if (n % factor === 0) return factor;
		factor += 2;
	}
	return n;
}
