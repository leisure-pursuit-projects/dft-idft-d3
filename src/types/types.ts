export type TVector = TVectorComplexValue[]

export type TVectorComplexValue = {
	re: number,
	im: number
}

export enum EScatterName {
	DFT = 'DFT',
	IDFT = 'IDFT'
}
