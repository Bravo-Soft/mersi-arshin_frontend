import { useAppSelector } from 'hooks/redux';
import { selectActualStep } from '../components/quickTourSlice';

import type { MutableRefObject } from 'react';
import type { GridApiPro } from '@mui/x-data-grid-pro/models/gridApiPro';
import { GridPreferencePanelsValue } from '@mui/x-data-grid-pro';

export const useQuickTourActions = (apiRef: MutableRefObject<GridApiPro>) => {
	const actualStep = useAppSelector(selectActualStep);
	if (apiRef) {
		switch (actualStep) {
			case 9:
				apiRef.current.showFilterPanel();
				break;
			case 5:
				apiRef.current?.showPreferences(GridPreferencePanelsValue.columns);
				break;
			default:
				break;
		}
	}

	return null;
};
