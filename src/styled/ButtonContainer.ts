import { styled } from '@mui/material';

const ButtonContainer = styled('div')(({ theme }) => ({
	padding: `0 ${theme.spacing(3.5)} ${theme.spacing(2)} ${theme.spacing(3.5)}`,
	display: 'flex',
}));

export default ButtonContainer;
