import { ColumnNames } from 'constant/columnsName';
import { IConfigArshin } from 'types/arshinIntegration';

const config: IConfigArshin[] = [
	{
		name: 'organization',
		title: ColumnNames.ORGANIZATION,
		disabled: true,
	},
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

export default config;
