import { GridValueFormatterParams } from '@mui/x-data-grid-pro';
import dayjs from 'dayjs';

export const formatDateCallback = (params: GridValueFormatterParams<string>) => {
	return dayjs(params.value).format('DD.MM.YYYY');
};
