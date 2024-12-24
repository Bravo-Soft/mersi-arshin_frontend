import { useEffect } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

export const useValdatingForm = () => {
	const filterConfig = {
		organization: false,
		type: false,
		factoryNumber: true,
		verificationDate: true,
		dateOfTheNextVerification: true,
		certificate: false,
		suitability: false,
	};

	const { trigger } = useFormContext();
	const formValues = useWatch();
	useEffect(() => {
		trigger();
	}, [formValues, trigger]);
};
