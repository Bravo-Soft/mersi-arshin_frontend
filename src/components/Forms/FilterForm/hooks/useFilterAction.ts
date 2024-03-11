import type { SelectChangeEvent } from '@mui/material/Select';
import { useState } from 'react';
import {
	type ControllerRenderProps,
	FieldPath,
	FieldValues,
	useFormContext,
} from 'react-hook-form';

import { operatorsFilters } from '../../NotificationSettings/data';
import { defaultFilterValue } from '../../NotificationSettings/defaultFilterValue';
import type { FormFiltersTypes } from '../../NotificationSettings/types';

import { useFilterFieldActions } from './useFilterFieldActions';

type Props = { fieldName: FieldPath<FieldValues> };

export const useFilterAction = ({ fieldName }: Props) => {
	const { filterType } = useFilterFieldActions();

	const { setValue, watch } = useFormContext<FieldValues>();

	const watchColumnField = watch(`${fieldName}.columnFilter`);

	const operatorValue = watch(`${fieldName}.operatorValue`);

	const [operatorValueX, setOperatorValue] = useState<FormFiltersTypes>(
		filterType(watchColumnField)
	);

	const columnChange = (field: ColumnFieldProps) => (event: SelectChangeEvent<string>) => {
		const eventFilterType = filterType(event.target.value);

		if (eventFilterType !== operatorValueX) {
			setOperatorValue(eventFilterType);
			setValue(`${fieldName}.operatorValue`, operatorsFilters[eventFilterType][0].operatorValue);
		}

		if (eventFilterType !== filterType(watchColumnField)) {
			setValue(`${fieldName}.value`, defaultFilterValue(eventFilterType));
		}

		field.onChange(event.target.value);
	};

	const operationChange = (field: OperationFieldProps) => (event: SelectChangeEvent<string>) => {
		if (operatorValue === 'isEmpty') {
			setValue(`${fieldName}.value`, '');
		}
		field.onChange(event.target.value);
	};

	return { columnChange, operationChange, operatorValue, operatorValueX };
};

export type ColumnFieldProps = ControllerRenderProps;

export type OperationFieldProps = ControllerRenderProps;
