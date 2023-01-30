import type { GridApiPro } from '@mui/x-data-grid-pro/models/gridApiPro';
import type { MutableRefObject } from 'react';

import { useAppDispatch } from 'hooks/redux';
import { useDebounce } from 'hooks/useDebounce';
import {
	useFetchSelectedTemplateQuery,
	useUpdateSelectedTemplateMutation,
} from '../modules/Templates/templatesApiSlice';
import { showNotification } from 'features/notificator/notificatorSlice';
import { Messages } from 'constant/messages';

export const useUpdateTemplate = (apiRef: MutableRefObject<GridApiPro>) => {
	const dispatch = useAppDispatch();

	const [updateSelectedConfig] = useUpdateSelectedTemplateMutation();
	const { data: currentConfig } = useFetchSelectedTemplateQuery();

	const handleUpdateTemplate = useDebounce(async () => {
		if (currentConfig) {
			const newTemplate = JSON.stringify(apiRef.current.exportState());
			const currentTemplate = currentConfig.template;
			if (newTemplate !== currentTemplate) {
				try {
					await updateSelectedConfig({ template: newTemplate });
				} catch {
					dispatch(
						showNotification({
							message: Messages.FAILED_TO_SAVE_TEMPLATE,
							type: 'error',
						})
					);
				}
			}
		}
	}, 2000);

	return handleUpdateTemplate;
};
