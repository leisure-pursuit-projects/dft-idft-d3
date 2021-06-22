export type ComplexVector = ComplexVectorValue[]

export type ComplexVectorValue = {
	x: number,
	y: number
}

export enum FastFourierTransforms {
	FFT = 'FFT',
	IFFT = 'IFFT'
}
