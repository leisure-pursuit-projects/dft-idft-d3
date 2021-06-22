// @ts-nocheck

export type ComplexVectorValue = {
	real: number,
	imag: number
};

export type HandleArray =
	Float32Array |
	Float64Array |
	Uint8ClampedArray |
	Array<Number> |
	BaseComplexVector

export class BaseComplexVector {
	other: HandleArray | unknown;
	// @ts-ignore
	ArrayType: any; // @ts-ignore
	real: any; // @ts-ignore
	imag: any; // @ts-ignore
	length: number = 0;

	constructor(
		other: number | HandleArray,
		arrayType = Float32Array) {
		if (other instanceof BaseComplexVector) {
			// Copy constructor.
			this.ArrayType = other.ArrayType;
			this.real = new this.ArrayType(other.real);
			this.imag = new this.ArrayType(other.imag);
		} else {
			this.ArrayType = arrayType;
			// other can be either an array or a number.
			this.real = this.ArrayType === Array ? other : new this.ArrayType(other);
			this.imag = new this.ArrayType(this.real.length);
		}

		this.length = this.real.length;
	}

	conjugate = () => new BaseComplexVector(this).map(value => value.imag *= -1);

	toString() {
		const components: Array<String> = [];

		this.forEach((
			value: ComplexVectorValue,
			i: number,
			) => (
				components.push(
					`(${ value.real.toFixed(2) }, ${ value.imag.toFixed(2) })`,
				)),
		)
		return `[${ components.join(', ') }]`;
	}

	forEach(iterator: (
		value: ComplexVectorValue,
		i: number,
		n: number,
	) => void): void {
		const n: number = this.length;
		// For gc efficiency, re-use a single object in the iterator.
		const value: ComplexVectorValue =
			<ComplexVectorValue>Object
				.seal(Object
					.defineProperties({}, {
						real: { writable: true },
						imag: { writable: true },
					}));

		for (let i = 0; i < n; i++) {
			value.real = this.real[i];
			value.imag = this.imag[i];
			iterator(value, i, n);
		}
	}

	// In-place mapper.
	map(
		mapper: (
			value: ComplexVectorValue,
			i: number,
			n: number,
		) => void): this {
		this.forEach((
			value: ComplexVectorValue,
			i: number,
			n: number,
		) => {
			mapper(value, i, n);
			this.real[i] = value.real;
			this.imag[i] = value.imag;
		});

		return this;
	}

	magnitude() {
		const mags = new this.ArrayType(this.length);

		this.forEach((
			value,
			i,
			) => (
				mags[i] = Math.sqrt(value.real * value.real + value.imag * value.imag)),
		)

		return mags;
	}
}
