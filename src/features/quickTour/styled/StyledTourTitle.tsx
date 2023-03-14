import { styled } from '@mui/material/styles';

import type { TypographyProps } from '@mui/material/Typography';

import Typography from '@mui/material/Typography';

//Стилизованный компонент заголовка  в туре

const StyledTourTitle = styled((props: TypographyProps) => (
	<Typography {...props} component='span' />
))({
	fontSize: 15,
	fontWeight: 600,
});

export default StyledTourTitle;
