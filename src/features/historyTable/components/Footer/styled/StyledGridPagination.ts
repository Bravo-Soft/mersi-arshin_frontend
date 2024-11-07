import { styled } from '@mui/material/styles';
import { GridPagination } from '@mui/x-data-grid-pro';

import { hideScrollbar } from 'utils/hideScrollbar';

interface IStyledGridPaginationProps {
	isWriter: boolean;
	isAdmin: boolean;
}

const properties: PropertyKey[] = ['isWriter', 'isAdmin'];

const StyledGridPagination = styled(GridPagination, {
	shouldForwardProp: prop => !properties.includes(prop),
})<IStyledGridPaginationProps>(({ theme, isWriter, isAdmin }) => ({
	marginRight: theme.spacing(3),
	overflowX: 'scroll',
	scrollbarWidth: 'none',
	...hideScrollbar(),

	...((isWriter || isAdmin) && { marginRight: theme.spacing(11) }),
}));

export default StyledGridPagination;
