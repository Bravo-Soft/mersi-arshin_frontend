import { GridValueFormatterParams } from '@mui/x-data-grid-pro';
import { format } from 'date-fns';

import { formatVariant } from 'constant/dateFormat';

export const formatDateCallback = (params: GridValueFormatterParams<string>) =>
	format(new Date(params.value), formatVariant);
