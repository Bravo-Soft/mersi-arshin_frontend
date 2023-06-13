import { styled } from '@mui/material/styles';
import type { TypographyProps } from '@mui/material/Typography';
import Typography from '@mui/material/Typography';

//Стилизованный компонент текста в туре

const StyledTourDescription = styled((props: TypographyProps) => (
	<Typography {...props} component='span' />
))({
	fontSize: 15,
	fontWeight: 400,
});

export default StyledTourDescription;
