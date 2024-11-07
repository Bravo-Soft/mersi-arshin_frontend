import type { GridStateColDef } from '@mui/x-data-grid-pro';

// import { setActualesColumns } from '../dataTableSlice';

import type { AppDispatch } from 'app/store';
import { editFields, verificationFields } from 'components/Forms/fields';
import type { IField, KeysOfEdit, KeysOfVerificate } from 'components/Forms/fields';

export const columnsVisibility = (
	visibleColumnsValue: GridStateColDef[],
	dispatch: AppDispatch
) => {
	const modifiedEditFields: IField<KeysOfEdit>[] = sortAndFilterColumns<KeysOfEdit>(
		visibleColumnsValue,
		editFields
	);
	const modifiedVerificationFields: IField<KeysOfVerificate>[] =
		sortAndFilterColumns<KeysOfVerificate>(visibleColumnsValue, verificationFields);
	// dispatch(
	// 	setActualesColumns({
	// 		modifiedEditFields,
	// 		modifiedVerificationFields,
	// 	})
	// );
};

const sortAndFilterColumns = <T>(
	visibleColumnsValue: GridStateColDef[],
	oldModifyArray: IField<T>[]
): IField<T>[] => {
	const modifinedColumns: IField<T>[] = [];
	visibleColumnsValue.forEach(e => {
		const find = oldModifyArray.find(y => y.key === e.field);
		find && modifinedColumns.push(find);
	});
	return modifinedColumns;
};
