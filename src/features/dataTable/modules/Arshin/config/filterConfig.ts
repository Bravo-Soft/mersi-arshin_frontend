import { ColumnNames } from 'constant/columnsName';
import { IConfigMainFiltersArshin, IConfigAdditionalFiltersArshin } from 'types/arshinIntegration';

export const configMain: IConfigMainFiltersArshin[] = [
	{
		name: 'type',
		title: ColumnNames.TYPE,
		disabled: true,
	},
	{
		name: 'factoryNumber',
		title: ColumnNames.FACTORY_NUMBER,
		disabled: true,
	},
	{
		name: 'verificationDate',
		title: ColumnNames.VERIFICATION_DATE,
		disabled: true,
	},
];

export const configAdditional: IConfigAdditionalFiltersArshin[] = [
	{
		name: 'organization',
		title: ColumnNames.ORGANIZATION,
		disabled: false,
	},
	{
		name: 'dateOfTheNextVerification',
		title: ColumnNames.DATE_OF_THE_NEXT_VERIFICATION,
		disabled: false,
	},
	{
		name: 'certificate',
		title: ColumnNames.CERTIFICATE,
		disabled: false,
	},
	{
		name: 'suitability',
		title: ColumnNames.SUITABILITY,
		disabled: false,
	},
];
