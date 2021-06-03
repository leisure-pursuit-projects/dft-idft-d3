export type TDeferred = {
	promise: Promise<void>;
	resolve: () => void
};
