import { createDeferredPromise } from 'utils/deferred';

export type TWasmLib = typeof import('rust-wasm-lib');

async function loadUnsafe(
): Promise<TWasmLib> {
	return await import('rust-wasm-lib');
}

export async function loadWasmLib() {
	let wasm: TWasmLib | undefined;

	try {
		wasm = await loadUnsafe();
		console.log('rust-wasm-utils is loaded');
		wasm?.init();
	} catch {
		console.error('failed to load rust-wasm-utils');
	}

	return wasm;
}

const globalDeferredLoad = createDeferredPromise();

const globalState = {
	isLoading: false,
	failedToLoad: false,
	promise: globalDeferredLoad.promise,
};

export function getGlobalWasmState() {
	return { ...globalState };
}

function loadAsyncHelper() {
	let wasm: TWasmLib | undefined;

	async function loadWasm() {
		globalState.isLoading = true;

		wasm = await loadWasmLib();

		globalDeferredLoad.resolve();

		globalState.failedToLoad = wasm === undefined;
		globalState.isLoading = false;
	}

	loadWasm().catch(console.error);

	return () => wasm;
}

// A function that will return the wasm utils if loaded globally or return undefined if not
export const getWasmLibIsLoaded = loadAsyncHelper();
