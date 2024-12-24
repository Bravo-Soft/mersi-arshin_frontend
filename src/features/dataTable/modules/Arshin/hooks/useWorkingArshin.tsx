import { enqueueSnackbar } from 'notistack';
import { useCallback } from 'react';

import { apiSlice } from '../../../../../app/apiSlice';
import { statusVariant } from '../config/arshinProcessConfig';
import { setEventSourceData } from '../eventSourceSlice';
import {
	arshinSseGuardProcessStatus,
	arshinSseGuardRequestStatus,
	arshinSseGuardWorking,
} from '../utils/arshinSSEGuard';

import { useServerSentEvent } from './useServerSentEvent';

import { useAppDispatch } from 'hooks/redux';

/**
 * @package хук обработчик SSE канала Arshin
 * @function callback => функция отправляющееся в useSendingArshin для выполнения в sse Arshin
 * @function useEffect => Если микросервис не работает то будет показан snackbar
 * @function useServerSentEvent => Создание SSE канала
 */

export const useProcessArshin = () => {
	const dispatch = useAppDispatch();

	const callBackWorking = useCallback(
		(event: MessageEvent) => {
			const data = JSON.parse(event.data);
			if (arshinSseGuardWorking(data)) {
				dispatch(setEventSourceData(data.isWorking));
			}
			if (arshinSseGuardRequestStatus(data)) {
				dispatch(apiSlice.util.invalidateTags(['ArshinData', 'RequestsList']));
				enqueueSnackbar(data.message.message, { variant: statusVariant[data?.message.status] });
			}

			if (arshinSseGuardProcessStatus(data)) {
				dispatch(apiSlice.util.invalidateTags(['ArshinData', 'RequestsList']));
				enqueueSnackbar(data.message, { variant: statusVariant[data.status] });
			}
		},
		[dispatch]
	);

	return useServerSentEvent(`/api/arshin/notifications/process`, callBackWorking);
};
