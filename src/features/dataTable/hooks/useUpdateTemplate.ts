import type { GridApiPro } from '@mui/x-data-grid-pro/models/gridApiPro';
import { enqueueSnackbar } from 'notistack';
import type { MutableRefObject } from 'react';

import {
	useFetchSelectedTemplateQuery,
	useUpdateSelectedTemplateMutation,
} from '../modules/Templates/templatesApiSlice';

import { Messages } from 'constant/messages';
import { useDebounce } from 'hooks/useDebounce';

export const useUpdateTemplate = (apiRef: MutableRefObject<GridApiPro>) => {
	const [updateSelectedConfig] = useUpdateSelectedTemplateMutation();
	const { data: currentConfig } = useFetchSelectedTemplateQuery()

	const handleUpdateTemplate = useDebounce(async () => {
		if (currentConfig) {
			const newTemplate = JSON.stringify(apiRef.current.exportState());
			const currentTemplate = currentConfig.template;
			if (newTemplate !== currentTemplate) {
				try {
					await updateSelectedConfig({ template: newTemplate });
				} catch {
					enqueueSnackbar(Messages.FAILED_TO_SAVE_TEMPLATE, { variant: 'error' });
				}
			}
		}
	}, 2000);

	return handleUpdateTemplate;
};
