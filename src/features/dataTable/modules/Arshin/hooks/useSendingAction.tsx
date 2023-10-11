import { enqueueSnackbar, closeSnackbar } from 'notistack';
import { useCallback, useEffect } from 'react';
import { z } from 'zod';

import { selectIsAliveArshin, setEventSourceData } from '../eventSourceSlice';

import { useServerSentEvent } from './useServerSentEvent';

import { BASE_URL } from 'constant/baseUrl';
import { useAppDispatch, useAppSelector } from 'hooks/redux';

export const useSendingAction = () => {
	const dispatch = useAppDispatch();
	const alive = useAppSelector(selectIsAliveArshin);
	const callBack = useCallback(
		(event: MessageEvent) => {
			const { total, processed, alive } = schema.parse(JSON.parse(event.data));

			const isStart = processed !== 0;

			localStorage.setItem('total', total.toString());
			localStorage.setItem('processed', processed.toString());
			localStorage.setItem('isAlive', `${alive}`);

			dispatch(setEventSourceData({ total, processed, isAlive: alive, isStart }));
		},
		[dispatch]
	);

	useServerSentEvent(`${BASE_URL}/api/user/modules/arshin/notifications`, callBack);

	useEffect(() => {
		!alive &&
			enqueueSnackbar('sdasad', {
				preventDuplicate: true,
				variant: 'error',
				persist: true,
				action: () => null,
			});

		return () => closeSnackbar();
	}, [alive]);
};

const schema = z.object({
	total: z.number(),
	processed: z.number(),
	alive: z.boolean(),
});
