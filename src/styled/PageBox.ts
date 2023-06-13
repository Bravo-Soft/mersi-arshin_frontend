import Box from '@mui/material/Box';
import type { BoxProps } from '@mui/material/Box';
import { styled } from '@mui/material/styles';

const PageBox = styled(Box)<BoxProps>(({ theme }) => ({
	position: 'relative',
	display: 'flex',
	flexDirection: 'column',
	flexGrow: 1,
	overflow: 'hidden',
	marginTop: theme.spacing(11),
})) as typeof Box;

export default PageBox;
