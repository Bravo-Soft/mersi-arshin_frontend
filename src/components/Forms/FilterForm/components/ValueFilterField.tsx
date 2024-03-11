import React from 'react';
import { FieldPath, FieldValues, useFormContext } from 'react-hook-form';

import BaseField from '../../FieldsComponents/BaseField';
import CostFilterField from '../../FieldsComponents/CostFilterField';
import DatePickerFilterField from '../../FieldsComponents/DatePickerFilterField';
import InterVerificationInterval from '../../FieldsComponents/InterVerificationInterval';
import SizeField from '../../FieldsComponents/SizeField';
import SuitabilityField from '../../FieldsComponents/SuitabilityField';
import { FormFiltersTypes } from '../../NotificationSettings/types';

type Props<T extends FieldValues> = {
	operatorValueX: FormFiltersTypes;
	valueName: FieldPath<T>;
};

function ValueFilterField<T extends FieldValues>({ operatorValueX, valueName }: Props<T>) {
	const { control } = useFormContext<FieldValues>();

	switch (operatorValueX) {
		case 'interVerificationInterval':
			return <InterVerificationInterval name={valueName} control={control} />;
		case 'suitability':
			return <SuitabilityField name={valueName} control={control} />;
		case 'cost':
			return <CostFilterField name={valueName} control={control} hText={false} />;
		case 'dateFilters':
			return <DatePickerFilterField name={valueName} control={control} />;
		case 'sizesFilters':
			return <SizeField name={valueName} control={control} />;
		default:
			return (
				<BaseField control={control} name={valueName} label='Значение фильтра' hText={false} />
			);
	}
}

export default ValueFilterField;
