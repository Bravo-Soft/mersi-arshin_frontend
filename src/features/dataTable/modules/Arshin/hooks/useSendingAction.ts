import { useCallback } from 'react';

import { setEventSourceData } from '../eventSourceSlice';

import { useServerSentEvent } from './useServerSentEvent';

import { BASE_URL } from 'constant/baseUrl';
import { useAppDispatch } from 'hooks/redux';

export const useSendingAction = () => {
	const dispatch = useAppDispatch();

	const callBack = useCallback(
		(event: MessageEvent) => {
			const { total, processed, isAlive } = JSON.parse(event.data);

			const isStart = processed !== 0;

			localStorage.setItem('total', total);
			localStorage.setItem('processed', processed);
			localStorage.setItem('isAlive', isAlive);

			dispatch(setEventSourceData({ total, processed, isAlive, isStart }));
		},
		[dispatch]
	);

	useServerSentEvent(`${BASE_URL}/api/user/modules/arshin/notifications`, callBack);

	// console.log('selectNotIsDone,', processData);
	// useEffect(() => {
	// 	const total = Number(localStorage.getItem('total')) ?? 0;
	// 	const processed = Number(localStorage.getItem('processed')) ?? 0;

	// 	dispatch(setEventSourceData({ total, processed }));
	// }, [dispatch]);

	// useEffect(() => {
	// 	if (processed === total) {
	// 		dispatch(resetState());
	// 		localStorage.setItem('total', '0');
	// 		localStorage.setItem('processed', '0');
	// 	}
	// }, [dispatch, processed, progressArshin, total]);
};
