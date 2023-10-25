import { enqueueSnackbar, closeSnackbar } from 'notistack';
import { useCallback, useEffect } from 'react';
import { z } from 'zod';

import { selectIsAliveArshin, setEventSourceData } from '../eventSourceSlice';

import { useServerSentEvent } from './useServerSentEvent';

import { apiSlice } from 'app/apiSlice';
import { BASE_URL } from 'constant/baseUrl';
import { useAppDispatch, useAppSelector } from 'hooks/redux';

const localeDefaultValue = {
	total: 0,
	processed: 0,
	alive: true,
};

/**
 * @package хук обработчик SSE канала Arshin
 * @function callBack => функция отправляющееся в useSendingArshin для выполнения в sse Arshin
 * @function useEffect => Если микросервис не работает то будет показан snackbar
 * @function useServerSentEvent => Создание SSE канала
 */

export const useSendingAction = () => {
	const dispatch = useAppDispatch();
	const alive = useAppSelector(selectIsAliveArshin);

	const callBack = useCallback(
		(event: MessageEvent) => {
			const { total, processed, alive } = schema.parse(JSON.parse(event.data));

			const isStart = processed !== 0;

			localStorage.setItem('progressUpdating', JSON.stringify({ total, processed, alive }));

			dispatch(setEventSourceData({ total, processed, isAlive: alive, isStart }));

			if (processed === 0 && total > 0) {
				dispatch(apiSlice.util.invalidateTags(['ArshinStart']));
			}
		},
		[dispatch]
	);
	useServerSentEvent(`${BASE_URL}/api/mersi/user/arshin/loading-process`, callBack);

	useEffect(() => {
		!alive &&
			enqueueSnackbar('Ошибка подключения к серверу', {
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
