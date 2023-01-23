import { useEffect, useMemo, useState } from 'react';

import type { RefObject } from 'react';

const useElementOnScreen = <T extends HTMLElement>(
	options: IntersectionObserverInit,
	ref: RefObject<T>
) => {
	const [isVisible, setIsVisible] = useState(false);

	const callbackFn = (entries: IntersectionObserverEntry[]): void => {
		const [entry] = entries;

		setIsVisible(entry.isIntersecting);
	};

	const optionsMemo = useMemo((): IntersectionObserverInit => options, [options]);

	useEffect(() => {
		const observer = new IntersectionObserver(callbackFn, optionsMemo);
		const currentTarget = ref.current;

		if (currentTarget) {
			observer.observe(currentTarget);
		}

		return () => {
			if (currentTarget) {
				observer.unobserve(currentTarget);
			}
		};
	}, [optionsMemo, ref]);

	return isVisible;
};

export default useElementOnScreen;
