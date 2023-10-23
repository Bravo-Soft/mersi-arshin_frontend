import { useEffect } from 'react';

/**
 * @package хук открывающий SSE канал
 * @props url => url для коннекта к каналу SSE
 * @props callBack => callBack которые будет принимать и обрабатывать ответ от SSE канала
 */

export const useServerSentEvent = (url: string, callBack: (event: MessageEvent) => void) => {
	useEffect(() => {
		const eventSource = new EventSource(url, {
			withCredentials: true,
		});
		eventSource.onmessage = event => {
			callBack(event);
		};
		if (eventSource.onerror) {
			eventSource.close();
		}
		return () => eventSource.close();
	}, [callBack, url]);
};
