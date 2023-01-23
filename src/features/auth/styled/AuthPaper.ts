import { styled } from '@mui/material/styles';

import { red } from '@mui/material/colors';
import { generateBootstrapShadow } from 'utils/generateBootstapShadow';

interface IAuthPaperProps {
	isError: boolean;
}

const AuthPaper = styled('form', {
	shouldForwardProp: prop => prop !== 'isError',
})<IAuthPaperProps>(({ theme, isError }) => ({
	backgroundColor: theme.palette.background.paper,
	border: `1px solid ${theme.palette.divider}`,
	borderRadius: theme.shape.borderRadius,
	padding: theme.spacing(2.5),
	minHeight: 300,
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'space-between',
	transition: theme.transitions.create(['box-shadow', 'border-color']),
	...(isError && {
		boxShadow: generateBootstrapShadow(theme, 'error', 0.4),
		borderColor: red[400],
	}),
}));

export default AuthPaper;
