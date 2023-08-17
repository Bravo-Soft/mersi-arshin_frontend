import { useGridApiContext } from '@mui/x-data-grid-pro';
import { useState } from 'react';

import { arshinFilterStatusDone } from 'constant/arshinStatus';

export const useFilterArshin = (): [VoidFunction, boolean] => {
	const apiRef = useGridApiContext();

	const localeStorageArshinState = Boolean(localStorage.getItem('Arshin-filter'));

	const isComplete = Boolean(localeStorageArshinState);
	const [completeDone, setCompleteDone] = useState(isComplete);

	const updateArshinFilter = () => {
		if (completeDone) {
			localStorage.removeItem('Arshin-filter');
			apiRef.current.deleteFilterItem(arshinFilterStatusDone);
		} else {
			localStorage.setItem('Arshin-filter', 'done');
			apiRef.current.upsertFilterItem(arshinFilterStatusDone);
		}
		setCompleteDone(prev => !prev);
	};

	return [updateArshinFilter, completeDone];
};
