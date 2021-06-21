export type ComplexVector = ComplexVectorValue[]

export type ComplexVectorValue = {
	re: number,
	im: number
}

export enum FastFourierTransforms {
	FFT = 'FFT',
	IFFT = 'IFFT'
}
