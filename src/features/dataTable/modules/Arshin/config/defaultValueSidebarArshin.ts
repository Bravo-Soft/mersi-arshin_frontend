import dayjs from 'dayjs';

export const defaultValueSidebarArshin = {
	name: '',
	type: '',
	factoryNumber: '',
	verificationDate: dayjs(new Date()),
	organization: '',
	dateOfTheNextVerification: dayjs(new Date()),
	certificate: '',
	suitability: 'false',
};
