import { useAppSelector } from 'hooks/redux';
import { selectActualStep } from '../components/quickTourSlice';

import type { MutableRefObject } from 'react';
import type { GridApiPro } from '@mui/x-data-grid-pro/models/gridApiPro';
import { GridPreferencePanelsValue } from '@mui/x-data-grid-pro';
import { useSidebarAction } from 'hooks/useSidebarActions';

export const useQuickTourActions = (apiRef: MutableRefObject<GridApiPro>) => {
	const actualStep = useAppSelector(selectActualStep);
	const { openSidebarWith } = useSidebarAction('home');

	if (apiRef) {
		switch (actualStep) {
			case 9:
				apiRef.current.showFilterPanel();
				break;
			case 5:
				apiRef.current?.showPreferences(GridPreferencePanelsValue.columns);
				break;
			case 1:
				openSidebarWith('CreateDataItem');
				break;
			default:
				break;
		}
	}

	return null;
};
