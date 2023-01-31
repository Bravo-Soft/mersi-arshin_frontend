/* eslint-disable @typescript-eslint/no-unused-vars */
import type { GridApiPro } from '@mui/x-data-grid-pro/models/gridApiPro';
import type { MutableRefObject } from 'react';

import { useAppDispatch } from 'hooks/redux';
import { useEffect, useRef } from 'react';
import { parseTemplate } from 'utils/templateUtils';
import { useFetchSelectedTemplateQuery } from '../modules/Templates/templatesApiSlice';

export const useApplySelectedTemplate = (apiRef: MutableRefObject<GridApiPro>) => {
	const isApplyed = useRef(false);
	const dispatch = useAppDispatch();
	const { data: selectedConfig, isSuccess } = useFetchSelectedTemplateQuery(undefined, {
		skip: isApplyed.current,
	});

	useEffect(() => {
		if (!isApplyed.current && isSuccess) {
			try {
				const parsedTemplate = parseTemplate(selectedConfig.template);
				apiRef.current.restoreState(parsedTemplate);
				isApplyed.current = true;
			} catch {
				return;
			}
		}
	}, [apiRef, dispatch, isSuccess, selectedConfig]);
};
