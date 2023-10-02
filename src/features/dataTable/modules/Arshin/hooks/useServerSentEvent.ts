import { useEffect } from 'react';

export const useServerSentEvent = (url: string, callBack: (event: MessageEvent) => void) => {
	const eventSource = new EventSource(url, {
		withCredentials: true,
	});
	eventSource.onmessage = event => callBack(event);
	if (eventSource.onerror) {
		eventSource.close();
	}
	useEffect(() => {
		return () => eventSource.close();
	}, [callBack, eventSource, url]);
};
