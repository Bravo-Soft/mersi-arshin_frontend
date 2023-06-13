import type { GridCellParams, GridColDef, GridValueFormatterParams } from '@mui/x-data-grid-pro';
import cn from 'classnames';
import { compareAsc, /* differenceInDays */ format, formatISO, parseISO } from 'date-fns';

import { RenderCellExpand } from './components/RenderCellExpand';
import { quickFilterDateFormat } from './utils/quickFilterDateFormat';

import { formatVariant } from 'constant/dateFormat';
import { Tag } from 'constant/tag';
import type { IDataItem } from 'types/dataItem';

const initialWidth = 200;

export enum ColumnNames {
	NAME = 'Наименование',
	TYPE = 'Тип СИ',
	FACTORY_NUMBER = 'Заводской номер',
	INVENTORY_NUMBER = 'Инвентарный номер',
	DIVISION = 'Подразделение',
	VERIFICATION_DATE = 'Дата поверки',
	DATE_OF_THE_NEXT_VERIFICATION = 'Дата след. поверки',
	TYPE_OF_WORK = 'Вид работ',
	CONDITION = 'Состояние',
	STATE_REGISTER = 'Госреестр',
	CERTIFICATE = 'Свидетельство',
	PRODUCTION_DATE = 'Дата производства',
	ORGANIZATION = 'Организация',
	ACCURACY_CLASS = 'Класс точности',
	MEASUREMENT_LIMIT = 'Предел измерения',
	SIZE = 'Размер бирки',
	NOTES = 'Примечания',
	VERIFICATION_INTERVAL = 'Межповерочный интервал',
}

const formatDateCallback = (params: GridValueFormatterParams<string>) =>
	format(new Date(params.value), formatVariant);

const getCellClasses = ({ value = '' }: GridCellParams<string>) => {
	//TODO: При необходимости включить стили для ячеек, срок поверки которых меньше 2 недель
	const parsedItemDate = parseISO(formatISO(new Date(value), { representation: 'date' }));
	const today = parseISO(formatISO(new Date(), { representation: 'date' }));
	// const result = differenceInDays(parsedItemDate, today);
	return cn({
		overdueItem: compareAsc(today, parsedItemDate) !== -1,
		// twoWeeksToGo: result <= 14 && result >= 0,
	});
};

export const columns: GridColDef<IDataItem>[] = [
	{
		field: 'name',
		headerName: ColumnNames.NAME,
		width: initialWidth,
		headerAlign: 'center',
		renderCell: RenderCellExpand,
	},
	{
		field: 'type',
		headerName: ColumnNames.TYPE,
		width: initialWidth,
		headerAlign: 'center',
		renderCell: RenderCellExpand,
	},
	{
		field: 'factoryNumber',
		headerName: ColumnNames.FACTORY_NUMBER,
		width: initialWidth,
		headerAlign: 'center',
		renderCell: RenderCellExpand,
	},
	{
		field: 'inventoryNumber',
		headerName: ColumnNames.INVENTORY_NUMBER,
		width: initialWidth,
		headerAlign: 'center',
		renderCell: RenderCellExpand,
	},
	{
		field: 'division',
		headerName: ColumnNames.DIVISION,
		width: initialWidth,
		headerAlign: 'center',
		renderCell: RenderCellExpand,
	},
	{
		field: 'verificationDate',
		headerName: ColumnNames.VERIFICATION_DATE,
		width: initialWidth,
		resizable: false,
		headerAlign: 'center',
		type: 'date',
		valueFormatter: formatDateCallback,
		valueGetter: ({ row }) => parseISO(row.verificationDate),
		getApplyQuickFilterFn: quickFilterDateFormat,
	},
	{
		field: 'interVerificationinterval',
		headerName: ColumnNames.VERIFICATION_INTERVAL,
		width: initialWidth,
		headerAlign: 'center',
		renderCell: RenderCellExpand,
	},
	{
		field: 'dateOfTheNextVerification',
		headerName: ColumnNames.DATE_OF_THE_NEXT_VERIFICATION,
		width: initialWidth,
		resizable: false,
		headerAlign: 'center',
		type: 'date',
		valueFormatter: formatDateCallback,
		cellClassName: getCellClasses,
		valueGetter: ({ row }) => parseISO(row.dateOfTheNextVerification),
		getApplyQuickFilterFn: quickFilterDateFormat,
	},
	{
		field: 'typeOfWork',
		headerName: ColumnNames.TYPE_OF_WORK,
		width: initialWidth,
		headerAlign: 'center',
		renderCell: RenderCellExpand,
	},
	{
		field: 'condition',
		headerName: ColumnNames.CONDITION,
		width: initialWidth,
		headerAlign: 'center',
		renderCell: RenderCellExpand,
	},
	{
		field: 'stateRegister',
		headerName: ColumnNames.STATE_REGISTER,
		width: initialWidth,
		headerAlign: 'center',
		renderCell: RenderCellExpand,
	},
	{
		field: 'certificate',
		headerName: ColumnNames.CERTIFICATE,
		width: initialWidth,
		headerAlign: 'center',
		renderCell: RenderCellExpand,
	},
	{
		field: 'productionDate',
		headerName: ColumnNames.PRODUCTION_DATE,
		width: initialWidth,
		resizable: false,
		headerAlign: 'center',
		type: 'date',
		valueFormatter: formatDateCallback,
		valueGetter: ({ row }) => parseISO(row.productionDate),
		getApplyQuickFilterFn: quickFilterDateFormat,
	},
	{
		field: 'organization',
		headerName: ColumnNames.ORGANIZATION,
		width: initialWidth,
		headerAlign: 'center',
		renderCell: RenderCellExpand,
	},
	{
		field: 'accuracyClass',
		headerName: ColumnNames.ACCURACY_CLASS,
		width: initialWidth,
		headerAlign: 'center',
		renderCell: RenderCellExpand,
	},
	{
		field: 'measurementLimit',
		headerName: ColumnNames.MEASUREMENT_LIMIT,
		width: initialWidth,
		headerAlign: 'center',
		renderCell: RenderCellExpand,
	},
	{
		field: 'size',
		headerName: ColumnNames.SIZE,
		width: initialWidth,
		headerAlign: 'center',
		type: 'singleSelect',
		valueOptions: [Tag.SMALL, Tag.MEDIUM, Tag.LARGE],
		renderCell: RenderCellExpand,
	},
	{
		field: 'notes',
		headerName: ColumnNames.NOTES,
		width: initialWidth,
		headerAlign: 'center',
		renderCell: RenderCellExpand,
	},
];

export default columns;
