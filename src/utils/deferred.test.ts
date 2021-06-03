import { createDeferredPromise } from './deferred';

test('deferred', async () => {
	const def = createDeferredPromise();
	let complete = false;
	def.promise.then(() => (complete = true));
	expect(complete).toBeFalsy();
	def.resolve();
	await def.promise;
	expect(complete).toBeTruthy();
});
