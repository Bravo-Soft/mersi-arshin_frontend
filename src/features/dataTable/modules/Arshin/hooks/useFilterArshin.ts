import { useGridApiContext } from '@mui/x-data-grid-pro';
import { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { useFetchSelectedTemplateQuery } from '../../Templates/templatesApiSlice';

import { ArshinStatus } from 'constant/arshinStatus';

interface ILocationState {
	isComplete: boolean;
}

const filterItem = {
	columnField: 'status',
	operatorValue: 'is',
	value: ArshinStatus.DONE,
};

export const useFilterArshin = () => {
	const apiRef = useGridApiContext();

	const { data: selectedConfig } = useFetchSelectedTemplateQuery();

	const state = useLocation().state as ILocationState | null;
	const localeStorageFilterArshin = Boolean(localStorage.getItem('FilterIsCompleteArshin'));
	const complete = state?.isComplete ?? localeStorageFilterArshin;

	const [isComplete, setIsComplete] = useState(complete);

	useEffect(() => {
		if (selectedConfig && apiRef) {
			const template = JSON.parse(selectedConfig.template);
			template.columns.orderedFields = template.columns.orderedFields.filter(
				(el: string) => !Object.keys(template.columns.columnVisibilityModel).includes(el)
			);
			template.columns.orderedFields.splice(2, 0, 'status');
			// сброс моделей из шаблона
			template.sorting.sortModel = [{ field: 'status', sort: 'asc' }];
			template.filter.filterModel = { items: complete ? [filterItem] : [{}] };
			template.pinnedColumns.left = [];
			template.pinnedColumns.right = [];
			apiRef.current.restoreState(template);
		}
	}, [apiRef, selectedConfig, complete]);

	const filterStorage = useCallback((complete: boolean) => {
		if (complete) {
			localStorage.setItem('FilterIsCompleteArshin', `${complete}`);
			apiRef.current.upsertFilterItem(filterItem);
		} else {
			localStorage.removeItem('FilterIsCompleteArshin');
			apiRef.current.deleteFilterItem(filterItem);
		}

		setIsComplete(complete);
	}, []);

	useEffect(() => {
		filterStorage(complete);
	}, [apiRef, complete, filterStorage, state]);

	const handleCompleting = () => {
		filterStorage(!isComplete);
	};

	return { handleCompleting, isComplete };
};
