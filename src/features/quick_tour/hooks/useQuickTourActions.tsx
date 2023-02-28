import { useAppSelector } from 'hooks/redux';
import { selectActualStep } from '../components/quickTourSlice';

import type { MutableRefObject } from 'react';
import type { GridApiPro } from '@mui/x-data-grid-pro/models/gridApiPro';
import { useSidebarAction } from 'hooks/useSidebarActions';

export const useQuickTourActions = (apiRef: MutableRefObject<GridApiPro>) => {
	const actualStep = useAppSelector(selectActualStep);

	const { openSidebarWith } = useSidebarAction('home');

	switch (actualStep) {
		case 1:
			openSidebarWith('CreateDataItem');
			break;

		default:
			break;
	}

	return null;
};
