import { GridFilterItem } from '@mui/x-data-grid/models/gridFilterItem';
import { useGridApiContext } from '@mui/x-data-grid-pro';
import { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

interface ILocationState {
	isComplete: boolean;
}

const filterItem = {
	columnField: 'verificationControlInStateRegister',
	operatorValue: 'is',
	value: true,
};

export const UseFilterArshin = (): [VoidFunction, boolean] => {
	const apiRef = useGridApiContext();

	const state = useLocation().state as ILocationState | null;
	const localeStorageFilterArshin = Boolean(localStorage.getItem('FilterIsCompleteArshin'));
	const complete = state?.isComplete ?? localeStorageFilterArshin;

	const [isComplete, setIsComplete] = useState(complete);

	const filterStorage = useCallback(
		(complete: boolean) => {
			const filterModel: GridFilterItem[] = [];

			if (complete) {
				filterModel.push(filterItem);
			}

			if (complete) {
				localStorage.setItem('FilterIsCompleteArshin', `${complete}`);
			} else {
				localStorage.removeItem('FilterIsCompleteArshin');
			}

			apiRef.current.setFilterModel({
				items: filterModel,
			});

			setIsComplete(complete);
		},
		[apiRef]
	);

	useEffect(() => {
		filterStorage(complete);
	}, [apiRef, complete, filterStorage, state]);

	const handleCompleting = () => {
		filterStorage(!isComplete);
	};

	return [handleCompleting, isComplete];
};
