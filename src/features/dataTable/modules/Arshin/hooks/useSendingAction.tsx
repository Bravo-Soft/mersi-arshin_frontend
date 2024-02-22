import { enqueueSnackbar } from 'notistack';
import { useCallback } from 'react';

import { schemaArshinProcess, statusVariant } from '../config/arshinProcessConfig';
import { setEventSourceData } from '../eventSourceSlice';

import { useServerSentEvent } from './useServerSentEvent';

import { apiSlice } from 'app/apiSlice';
import { useAppDispatch } from 'hooks/redux';

/**
 * @package хук обработчик SSE канала Arshin
 * @function callBack => функция отправляющееся в useSendingArshin для выполнения в sse Arshin
 * @function useEffect => Если микросервис не работает то будет показан snackbar
 * @function useServerSentEvent => Создание SSE канала
 */

export const useSendingAction = () => {
	const dispatch = useAppDispatch();

	const callBack = useCallback(
		(event: MessageEvent) => {
			const { status, message } = schemaArshinProcess.parse(JSON.parse(event.data));
			dispatch(apiSlice.util.invalidateTags(['ArshinData']));
			enqueueSnackbar(message, { variant: statusVariant[status] });
		},
		[dispatch]
	);

	const callBackWorking = useCallback(
		(event: MessageEvent) => {
			const { isWorking } = JSON.parse(event.data);
			const wwwww = JSON.parse(event.data);
			const test = isWorking !== 'false';
			console.log(test);
			console.log(JSON.stringify(wwwww, null, 2));
			dispatch(setEventSourceData(test));
		},
		[dispatch]
	);

	useServerSentEvent(`/api/arshin/notifications/action`, callBack);
	useServerSentEvent(`/api/arshin/notifications/working`, callBackWorking);
};
