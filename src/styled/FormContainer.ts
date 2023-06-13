import { styled } from '@mui/material/styles';

import { hideScrollbar } from 'utils/hideScrollbar';

const FormContainer = styled('form')({
	height: '100%',
	display: 'flex',
	flexDirection: 'column',
	overflowX: 'hidden',
	...hideScrollbar(),
});

export default FormContainer;
