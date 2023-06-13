import { GridLinkOperator } from '@mui/x-data-grid-pro';
import type { GridInitialStatePro } from '@mui/x-data-grid-pro/models/gridStatePro';

export const defaultTemplate: GridInitialStatePro = {
	pinnedColumns: {},
	columns: {
		columnVisibilityModel: {},
		orderedFields: [
			'__check__',
			'name',
			'type',
			'factoryNumber',
			'inventoryNumber',
			'division',
			'verificationDate',
			'dateOfTheNextVerification',
			'typeOfWork',
			'condition',
			'stateRegister',
			'certificate',
			'productionDate',
			'organization',
			'accuracyСlass',
			'measurementLimit',
			'size',
			'notes',
		],
		dimensions: {
			name: {
				maxWidth: -1,
				minWidth: 50,
				width: 200,
			},
			type: {
				maxWidth: -1,
				minWidth: 50,
				width: 200,
			},
			factoryNumber: {
				maxWidth: -1,
				minWidth: 50,
				width: 200,
			},
			inventoryNumber: {
				maxWidth: -1,
				minWidth: 50,
				width: 200,
			},
			division: {
				maxWidth: -1,
				minWidth: 50,
				width: 200,
			},
			verificationDate: {
				maxWidth: -1,
				minWidth: 50,
				width: 200,
			},
			dateOfTheNextVerification: {
				maxWidth: -1,
				minWidth: 50,
				width: 200,
			},
			typeOfWork: {
				maxWidth: -1,
				minWidth: 50,
				width: 200,
			},
			condition: {
				maxWidth: -1,
				minWidth: 50,
				width: 200,
			},
			stateRegister: {
				maxWidth: -1,
				minWidth: 50,
				width: 200,
			},
			certificate: {
				maxWidth: -1,
				minWidth: 50,
				width: 200,
			},
			productionDate: {
				maxWidth: -1,
				minWidth: 50,
				width: 200,
			},
			organization: {
				maxWidth: -1,
				minWidth: 50,
				width: 200,
			},
			accuracyСlass: {
				maxWidth: -1,
				minWidth: 50,
				width: 200,
			},
			measurementLimit: {
				maxWidth: -1,
				minWidth: 50,
				width: 200,
			},
			size: {
				maxWidth: -1,
				minWidth: 50,
				width: 200,
			},
			notes: {
				maxWidth: -1,
				minWidth: 50,
				width: 200,
			},
		},
	},
	preferencePanel: {
		open: false,
	},
	filter: {
		filterModel: {
			items: [],
			linkOperator: GridLinkOperator.And,
			quickFilterValues: [],
			quickFilterLogicOperator: GridLinkOperator.And,
		},
	},
	sorting: {
		sortModel: [],
	},
	pagination: {
		pageSize: 100,
		page: 0,
	},
};
