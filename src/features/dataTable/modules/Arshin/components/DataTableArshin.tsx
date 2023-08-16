import LinearProgress from '@mui/material/LinearProgress';
import { GridSelectionModel, useGridApiRef } from '@mui/x-data-grid-pro';
import { DataGridPro } from '@mui/x-data-grid-pro';

import { columnsArshin } from '../config/columns';
import { useApplyTemplate } from '../hooks/useApplyTemplate';
import useTableActions from '../hooks/useTableActions';

import DataTableArshinToolbar from './DataTableArshinToolbar';

import { ArshinStatus } from 'constant/arshinStatus';
import { Tag } from 'constant/tag';
import { NoResultsOverlay } from 'features/dataTable/components/NoResultsOverlay';
import { NoRowsOverlay } from 'features/dataTable/components/NoRowsOverlay';
import DataTableBox from 'styled/DataTableBox';
import { IDataItemArshin } from 'types/arshinIntegration';

export const dataArshin: IDataItemArshin[] = [
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
	{
		accuracyClass: 'test',
		additionalData: 'test',
		certificate: 'test',
		condition: 'test',
		cost: 'test',
		dateOfTheNextVerification: '2023-08-08T00:00:00.000Z',
		division: 'test',
		documents: [],
		factoryNumber: 'test',
		fgisUrl: 'test',
		id: '45',
		interVerificationInterval: 'test',
		inventoryNumber: 'test',
		location: 'test',
		measurementLimit: 'test',
		methodology: 'test',
		name: 'name',
		notes: 'notes',
		organization: 'organization',
		productionDate: '2023-08-08T00:00:00.000Z',
		responsible: 'responsible',
		size: Tag.MEDIUM,
		stateRegister: 'stateRegister',
		status: ArshinStatus.DONE,
		suitability: 'suitability',
		type: 'type',
		typeOfWork: 'typeOfWork',
		userIds: [],
		verificationControlInStateRegister: true,
		verificationDate: '2023-08-08T00:00:00.000Z',
	},
	{
		accuracyClass: 'test_test',
		additionalData: 'test_test',
		certificate: 'test_test',
		condition: 'test_test',
		cost: 'test_test',
		dateOfTheNextVerification: '2023-08-08T00:00:00.000Z',
		division: 'test_test',
		documents: [],
		factoryNumber: 'test_test',
		fgisUrl: 'test_test',
		id: '5',
		interVerificationInterval: 'test_test',
		inventoryNumber: 'test_test',
		location: 'test_test',
		measurementLimit: 'test_test',
		methodology: 'test_test',
		name: 'test_test',
		notes: 'test_test',
		organization: 'test_test',
		productionDate: '2023-08-08T00:00:00.000Z',
		responsible: 'test_test',
		size: Tag.MEDIUM,
		stateRegister: 'stateRegister',
		status: ArshinStatus.DONE,
		suitability: 'test_test',
		type: 'type',
		typeOfWork: 'test_test',
		userIds: [],
		verificationControlInStateRegister: true,
		verificationDate: '2023-08-08T00:00:00.000Z',
	},
];

function DataTableArshin() {
	const apiRef = useGridApiRef();

	useApplyTemplate(apiRef);

	const { selectionIds, handleSelectItems } = useTableActions();

	return (
		<DataTableBox>
			<DataGridPro
				apiRef={apiRef}
				columns={columnsArshin}
				rows={dataArshin}
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
				onSelectionModelChange={(newSelectionModel: GridSelectionModel) => {
					handleSelectItems(newSelectionModel);
				}}
				selectionModel={selectionIds}
			/>
		</DataTableBox>
	);
}

export default DataTableArshin;
