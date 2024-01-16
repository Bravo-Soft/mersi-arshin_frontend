import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

interface IPrintingTagParamsProps {
	isVisible: boolean;
	translatedKey: string;
	value: string | boolean;
}

function PrintingTagParams({ isVisible, translatedKey, value }: IPrintingTagParamsProps) {
	if (!isVisible) {
		return null;
	}

	const printValue = value ? (typeof value === 'boolean' ? (value ? 'Да ' : 'Нет') : value) : '-';

	return (
		<Stack direction='row' flexWrap='wrap' justifyContent='flex-start' gap={0.5}>
			<Typography noWrap>{translatedKey}:</Typography>
			<Typography fontWeight='bold'>{printValue}</Typography>
		</Stack>
	);
}

export default PrintingTagParams;
