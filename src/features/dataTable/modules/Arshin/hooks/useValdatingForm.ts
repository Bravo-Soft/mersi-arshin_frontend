import { useEffect } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { useGetFiltersQuery } from '../arshinTableApiSlice';

import { IFormFilterArshin } from 'types/arshinIntegration';

export const useValdatingForm = () => {
	const { data: filterConfig = {} as IFormFilterArshin } = useGetFiltersQuery();
	const { trigger } = useFormContext();
	const formValues = useWatch();
	useEffect(() => {
		trigger();
	}, [filterConfig, formValues, trigger]);
};
