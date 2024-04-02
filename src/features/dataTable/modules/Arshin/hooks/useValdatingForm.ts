import { useEffect } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { useGetFiltersQuery } from '../arshinTableApiSlice';

import { IFormFilterArshin } from 'types/arshinIntegration';

export const useValdatingForm = () => {
	const { data: filterConfig = {} as IFormFilterArshin } = useGetFiltersQuery();

	const { setError, clearErrors, trigger } = useFormContext();

	const formValues = useWatch();

	useEffect(() => {
		(Object.entries(filterConfig) as Array<[keyof IFormFilterArshin, boolean]>).forEach(
			([key, value]) => {
				if (key !== 'period' && value && !formValues[key]) {
					setError(key, { type: 'required', message: 'Обязательное поле' });
				}
			}
		);
		return () => clearErrors();
	}, [filterConfig, trigger, formValues, clearErrors, setError]);
};
