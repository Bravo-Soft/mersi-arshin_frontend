import { useCallback } from 'react';

import { schemaArshinWorking } from '../config/arshinProcessConfig';
import { setEventSourceData } from '../eventSourceSlice';

import { useServerSentEvent } from './useServerSentEvent';

import { useAppDispatch } from 'hooks/redux';

/**
 * @package хук обработчик SSE канала Arshin
 * @function callBack => функция отправляющееся в useSendingArshin для выполнения в sse Arshin
 * @function useEffect => Если микросервис не работает то будет показан snackbar
 * @function useServerSentEvent => Создание SSE канала
 */

export const useWorkingArshin = () => {
	const dispatch = useAppDispatch();

	const callBackWorking = useCallback(
		(event: MessageEvent) => {
			const { isWorking } = schemaArshinWorking.parse(JSON.parse(event.data));
			dispatch(setEventSourceData(isWorking));
		},
		[dispatch]
	);

	return useServerSentEvent(`/api/arshin/notifications/working`, callBackWorking);
};
