import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

interface IPrintingTagParamsProps {
	isVisible: boolean;
	translatedKey: string;
	value: string;
}

function PrintingTagParams({ isVisible, translatedKey, value }: IPrintingTagParamsProps) {
	if (!isVisible) {
		return null;
	}

	return (
		<Stack direction='row' flexWrap='wrap' justifyContent='flex-start' gap={0.5}>
			<Typography noWrap>{translatedKey}:</Typography>
			<Typography fontWeight='bold'>{value ? value : '-'}</Typography>
		</Stack>
	);
}

export default PrintingTagParams;
