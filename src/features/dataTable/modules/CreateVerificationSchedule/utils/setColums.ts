import type { GridApiPro } from '@mui/x-data-grid-pro/models/gridApiPro';
import type { MutableRefObject } from 'react';

export const setColumns = (apiRef: MutableRefObject<GridApiPro>) => {
	const columns = apiRef.current
		.getAllColumns()
		.map(el => ({
			field: el.field,
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			headerName: el.headerName!,
			type:
				el.type === 'string'
					? 'defaultFilters'
					: el.type === 'date'
					? 'dateFilters'
					: 'sizesFilters',
		}))
		.filter(el => el.field !== 'dateOfTheNextVerification' && el.field !== '__check__');
	return columns;
};
