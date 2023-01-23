import Box from '@mui/material/Box';

import { styled } from '@mui/material/styles';
import { hideScrollbar } from 'utils/hideScrollbar';

const FilesListStyledWrapper = styled(Box)(({ theme }) => ({
	flexGrow: 1,
	border: `1px solid ${theme.palette.divider}`,
	borderRadius: theme.shape.borderRadius,
	display: 'flex',
	justifyContent: 'center',
	backgroundColor: theme.palette.grey[50],
	overflowY: 'scroll',

	...hideScrollbar(),
}));

export default FilesListStyledWrapper;
