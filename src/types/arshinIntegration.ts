export interface IFormFilterArshin {
	organization: boolean;
	type: boolean;
	factoryNumber: boolean;
	verificationDate: boolean;
	dateOfTheNextVerification: boolean;
	certificate: boolean;
	suitability: boolean;
}

export interface IConfigArshin {
	name: keyof IFormFilterArshin;
	title: string;
	disabled: boolean;
}
