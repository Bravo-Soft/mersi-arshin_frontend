import { styled } from '@mui/material/styles';
import type { TypographyProps } from '@mui/material/Typography';
import Typography from '@mui/material/Typography';

const StyledTourDescription = styled((props: TypographyProps) => (
	<Typography {...props} component='span' />
))({
	display: 'inline',
	fontSize: 15,
	fontWeight: 400,
});

export default StyledTourDescription;
