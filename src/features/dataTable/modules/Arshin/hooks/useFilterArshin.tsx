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
		const filterIsCompleteArshin = localStorage.getItem('FilterIsCompleteArshin');

		localStorage.setItem(
			'FilterIsCompleteArshin',
			`${state?.isComplete ?? filterIsCompleteArshin ?? false}`
		);

		const complete = state?.isComplete || Boolean(filterIsCompleteArshin);

		if (complete) {
			apiRef &&
				apiRef.current.setFilterModel({
					items: [filterItem(complete)],
				});
			setIsComplete(complete);
			localStorage.setItem('FilterIsCompleteArshin', `${state?.isComplete}`);
		}
	}, []);

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
