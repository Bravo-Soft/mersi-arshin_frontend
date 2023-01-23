import { styled } from '@mui/material/styles';
import { GridPagination } from '@mui/x-data-grid-pro';
import { hideScrollbar } from 'utils/hideScrollbar';

interface IStyledGridPaginationProps {
	isWriter: boolean;
}

const StyledGridPagination = styled(GridPagination, {
	shouldForwardProp: prop => prop !== 'isWriter',
})<IStyledGridPaginationProps>(({ theme, isWriter }) => ({
	marginRight: theme.spacing(3),
	overflowX: 'scroll',
	scrollbarWidth: 'none',
	...hideScrollbar(),

	...(isWriter && { marginRight: theme.spacing(11) }),
}));

export default StyledGridPagination;
