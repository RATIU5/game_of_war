const createSignal = <T = unknown>(initialValue: T) => {
	let value: T = initialValue;
	const listeners: Set<(value: T) => void> = new Set();

	const setValue = (newValue: T) => {
		value = newValue;
		listeners.forEach((listener) => listener(value));
	};

	const getValue = () => value;

	const subscribe = (callback: (value: T) => void) => {
		listeners.add(callback);
		return () => listeners.delete(callback);
	};

	return { subscribe, get: getValue, set: setValue } as const;
};

export default createSignal;
