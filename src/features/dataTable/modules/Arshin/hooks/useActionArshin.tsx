import { enqueueSnackbar } from "notistack";
import { useCallback } from "react";

import { schemaArshinProcess, statusVariant } from "../config/arshinProcessConfig";

import { useServerSentEvent } from "./useServerSentEvent";

import { apiSlice } from "app/apiSlice";
import { useAppDispatch } from "hooks/redux";

/**
 * @package хук обработчик SSE канала Arshin
 * @function callBack => функция отправляющееся в useSendingArshin для выполнения в sse Arshin
 * @function useEffect => Если микросервис не работает то будет показан snackbar
 * @function useServerSentEvent => Создание SSE канала
 */

export const useActionArshin = () => {
	const dispatch = useAppDispatch();

	const callBack = useCallback(
		(event: MessageEvent) => {
			const { status, message } = schemaArshinProcess.parse(JSON.parse(event.data));
			dispatch(apiSlice.util.invalidateTags(['ArshinData']));
			enqueueSnackbar(message, { variant: statusVariant[status] });
		},
		[dispatch]
	);

	useServerSentEvent(`/api/arshin/notifications/action`, callBack);
};
