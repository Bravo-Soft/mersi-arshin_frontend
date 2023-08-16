import { GridFilterItem } from '@mui/x-data-grid/models/gridFilterItem';
import { useGridApiContext } from '@mui/x-data-grid-pro';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

interface ILocationState {
	isComplete: boolean;
}

const filterItem = (isComplete: boolean) => ({
	columnField: 'verificationControlInStateRegister',
	operatorValue: 'is',
	value: isComplete,
});
export const UseFilterArshin = (): [VoidFunction, boolean] => {
	const apiRef = useGridApiContext();

	const state = useLocation().state as ILocationState | null;
	const [isComplete, setIsComplete] = useState(false);

	useEffect(() => {
		const filterIsCompleteArshin = Boolean(localStorage.getItem('FilterIsCompleteArshin'));

		const complete = Boolean(state === null ? filterIsCompleteArshin : state.isComplete);

		localStorage.setItem('FilterIsCompleteArshin', `${complete}`);

		if (complete) {
			apiRef &&
				apiRef.current.setFilterModel({
					items: [filterItem(complete)],
				});
			setIsComplete(complete);
		}

		const filterModel: GridFilterItem[] = [];

		setIsComplete(complete);

		if (complete) {
			filterModel.push(filterItem(complete));
		}

		apiRef && apiRef.current.setFilterModel({ items: filterModel });
	}, [apiRef, state]);

	const handleCompleting = () => {
		const filterModel: GridFilterItem[] = [];

		setIsComplete(prev => !prev);

		if (!isComplete) {
			filterModel.push(filterItem(!isComplete));
		}

		apiRef && apiRef.current.setFilterModel({ items: filterModel });
	};

	return [handleCompleting, isComplete];
};
