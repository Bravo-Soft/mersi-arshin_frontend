import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { getPrintValue } from '../utils/getPrintValue';

interface IPrintingTagParamsProps {
	isVisible: boolean;
	translatedKey: string;
	value: string | boolean | number;
}

function PrintingTagParams({ isVisible, translatedKey, value }: IPrintingTagParamsProps) {
	if (!isVisible) {
		return null;
	}

	return (
		<Stack direction='row' flexWrap='wrap' justifyContent='flex-start' gap={0.5}>
			<Typography noWrap>{translatedKey}:</Typography>
			<Typography fontWeight='bold'>{getPrintValue(value)}</Typography>
		</Stack>
	);
}

export default PrintingTagParams;
