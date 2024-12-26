import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

import type { SidebarSelectors } from '../sidebarSlice';

import { useEditActions } from './useEditActions';

import { isFormSelector } from 'guards/isFormSelector';
import { usePage } from 'hooks/usePage';
import { useSidebarAction } from 'hooks/useSidebarActions';

interface ISidebarHeaderProps {
	title?: string;
	selector?: SidebarSelectors;
}

function SidebarHeader({ title, selector }: ISidebarHeaderProps): JSX.Element {
	const page = usePage();
	const { closeSidebar } = useSidebarAction(page);

	const isForm = isFormSelector(selector);
	const { hasAccess, handleOpenDeletingDialog } = useEditActions();

	return (
		<Box pt='4px' px='4px'>
			<Toolbar>
				<Typography color='primary.main' variant='h6' lineHeight={1.3} flexGrow={1}>
					{title}
				</Typography>
				{isForm && hasAccess && (
					<Tooltip title={'Удалить СИ'}>
						<IconButton onClick={handleOpenDeletingDialog}>
							<DeleteIcon />
						</IconButton>
					</Tooltip>
				)}
				<Tooltip title='Закрыть'>
					<IconButton onClick={closeSidebar} sx={{ ml: 1 }}>
						<CloseIcon />
					</IconButton>
				</Tooltip>
			</Toolbar>
		</Box>
	);
}

export default SidebarHeader;
