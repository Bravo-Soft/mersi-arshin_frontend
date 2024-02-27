import { useEffect, useState } from 'react';

/**
 * @package хук открывающий SSE канал
 * @props url => url для коннекта к каналу SSE
 * @props callBack => callBack которые будет принимать и обрабатывать ответ от SSE канала
 */

export const useServerSentEvent = (
	url: string,
	callBack: (event: MessageEvent) => void,
	disabled?: boolean
) => {
	const [isOpen, setIsOpen] = useState(false);

	useEffect(() => {
		const eventSource = new EventSource(url, {
			withCredentials: true,
		});
		eventSource.onmessage = event => {
			callBack(event);
		};

		eventSource.onopen = () => {
			setIsOpen(true);
		};

		if (eventSource.onerror) {
			eventSource.close();
			setIsOpen(false);
		}
		return () => eventSource.close();
	}, [callBack, disabled, url]);

	return isOpen;
};
