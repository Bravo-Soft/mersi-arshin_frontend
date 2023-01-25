import { useCallback, useRef } from 'react';

export const useDebounce = <T, Y>(callback: (...args: T[]) => Y, delay: number) => {
	const timer = useRef<NodeJS.Timeout>();

	const debouncedCallback = useCallback(
		(...args: T[]) => {
			if (timer.current) {
				clearTimeout(timer.current);
			}
			timer.current = setTimeout(() => callback(...args), delay);
		},
		[callback, delay]
	);

	return debouncedCallback;
};
