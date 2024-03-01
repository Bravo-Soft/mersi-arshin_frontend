import type { SelectChangeEvent } from '@mui/material/Select';
import { useState } from 'react';
import { type ControllerRenderProps, useFormContext } from 'react-hook-form';

import type { INotificationSettings } from '../../../../types/notification';
import { operatorsFilters } from '../data';
import { defaultFilterValue } from '../defaultFilterValue';
import type { FormFiltersTypes } from '../types';

import { useNotificationFormActions } from './useNotificationFormActions';

type Props = { index: number; indexK: number };

export const useNotificationAction = ({ index, indexK }: Props) => {
	const { filterType } = useNotificationFormActions();

	const { setValue, watch } = useFormContext<INotificationSettings>();

	const fieldName = `subscribedEmails.${index}.emailFilters.${indexK}` as const;

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
			setValue(`subscribedEmails.${index}.emailFilters.${indexK}.value`, '');
		}
		field.onChange(event.target.value);
	};

	return { columnChange, operationChange, operatorValue, operatorValueX };
};

export type ColumnFieldProps = ControllerRenderProps;

export type OperationFieldProps = ControllerRenderProps;
