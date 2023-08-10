import LinearProgress from '@mui/material/LinearProgress';
import { GridSelectionModel, useGridApiRef } from '@mui/x-data-grid-pro';
import { DataGridPro } from '@mui/x-data-grid-pro';
import { useState } from 'react';

import { columnsArshin } from '../config/columns';
import { useApplyTemplate } from '../hooks/useApplyTemplate';

import DataTableArshinToolbar from './DataTableArshinToolbar';

import { ArshinStatus } from 'constant/arshinStatus';
import { Tag } from 'constant/tag';
import { NoResultsOverlay } from 'features/dataTable/components/NoResultsOverlay';
import { NoRowsOverlay } from 'features/dataTable/components/NoRowsOverlay';
import DataTableBox from 'styled/DataTableBox';
import { IDataItemArshin } from 'types/arshinIntegration';

const data: IDataItemArshin[] = [
	{
		accuracyClass: '123',
		additionalData: '123',
		certificate: '123',
		condition: '123',
		cost: '123',
		dateOfTheNextVerification: '2023-08-08T00:00:00.000Z',
		division: '123',
		documents: [],
		factoryNumber: '123',
		fgisUrl: '123',
		id: '1',
		interVerificationInterval: '123',
		inventoryNumber: '123',
		location: '123',
		measurementLimit: '123',
		methodology: '123',
		name: 'name',
		notes: 'notes',
		organization: 'organization',
		productionDate: '2023-08-08T00:00:00.000Z',
		responsible: 'responsible',
		size: Tag.MEDIUM,
		stateRegister: 'stateRegister',
		status: ArshinStatus.FAILED_TO_RETRIEVE_DATA,
		suitability: 'suitability',
		type: 'type',
		typeOfWork: 'typeOfWork',
		userIds: [],
		verificationControlInStateRegister: true,
		verificationDate: '2023-08-08T00:00:00.000Z',
	},
];

function DataTableArshin() {
	const [selectionItems, setSelectionItems] = useState<GridSelectionModel>([]);

	const apiRef = useGridApiRef();

	useApplyTemplate(apiRef);

	return (
		<DataTableBox>
			<DataGridPro
				apiRef={apiRef}
				columns={columnsArshin}
				rows={data}
				// loading={isFetchingData}
				disableColumnMenu
				pagination
				checkboxSelection
				disableSelectionOnClick
				disableColumnResize
				disableColumnReorder
				density='compact'
				components={{
					LoadingOverlay: LinearProgress,
					Toolbar: DataTableArshinToolbar,
					NoRowsOverlay,
					NoResultsOverlay,
				}}
				componentsProps={{
					toolbar: { selectionItems },
				}}
				onSelectionModelChange={(newSelectionModel: GridSelectionModel) => {
					setSelectionItems(newSelectionModel);
				}}
				selectionModel={selectionItems}
			/>
		</DataTableBox>
	);
}

export default DataTableArshin;
