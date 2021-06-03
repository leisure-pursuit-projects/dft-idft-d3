import { TDeferred } from './types';

/*
 * Create a Promise<void> that blocks until resolve is called
 */
export function createDeferredPromise () {
	const deferred: Partial<TDeferred> = {};
	deferred.promise = new Promise((resolve) => {
		deferred.resolve = resolve;
	});

	return deferred as TDeferred;
}
