import { styled } from '@mui/material/styles';

import MenuList from '@mui/material/MenuList';

const StyledMenuList = styled(MenuList)(({ theme }) => ({
	'& .MuiMenuItem-root': { paddingLeft: theme.spacing(4) },
	backgroundColor: theme.palette.grey[100],
	borderTop: `1px solid ${theme.palette.divider}`,
	borderBottom: `1px solid ${theme.palette.divider}`,
})) as typeof MenuList;

export default StyledMenuList;
