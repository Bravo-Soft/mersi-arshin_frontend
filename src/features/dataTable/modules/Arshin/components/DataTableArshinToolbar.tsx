import ExpandIcon from '@mui/icons-material/ExpandMore';
import ListIcon from '@mui/icons-material/List';
import { Divider, IconButton, Stack, Tooltip, Toolbar, Collapse } from '@mui/material';
import { GridToolbarContainer } from '@mui/x-data-grid-pro';
import { useState } from 'react';

import { useArshinRequests } from '../hooks/useArshinRequests';

import ArshinSendingBtn from './ArshinSendingBtn';
import ArshinTableToolbarFilter from './ArshinTableToolbarFilter';
import MenuActionsArshin from './MenuActionsArshin';

import ButtonsNavigation from 'features/dataTable/components/ButtonsNavigation';
import StyledChip from 'features/dataTable/styled/StyledChip';
import { selectSidebarStateOfArshinPage } from 'features/sidebar/sidebarSlice';
import { useAppSelector } from 'hooks/redux';
import { usePage } from 'hooks/usePage';
import { useSidebarAction } from 'hooks/useSidebarActions';

function DataTableArshinToolbar(): JSX.Element {
	const [expanded, setExpanded] = useState(false);

	const page = usePage();

	const { openSidebarWith, closeSidebar } = useSidebarAction(page);
	const { resetSelectedRequest } = useArshinRequests();
	const { open, selector } = useAppSelector(selectSidebarStateOfArshinPage);

	const handleToggleRequestsList = () => {
		if (open) {
			resetSelectedRequest();
			closeSidebar();
			return;
		}
		return openSidebarWith('RequestsList');
	};

	const handleToggleFilterPanel = () => {
		setExpanded(prev => !prev);
	};

	return (
		<>
			<GridToolbarContainer>
				<Toolbar sx={{ width: 1, overflow: 'scroll' }}>
					<Stack direction='row' alignItems='center' flexGrow={1} spacing={2}>
						<ButtonsNavigation />
						<Divider orientation='vertical' flexItem />
						<Tooltip
							title={
								expanded
									? 'Скрыть панель быстрых фильтров'
									: 'Показать панель быстрых фильтров'
							}
						>
							<IconButton onClick={handleToggleFilterPanel} color='primary'>
								<ExpandIcon
									sx={{
										transition: theme => theme.transitions.create('rotate'),
										rotate: expanded ? '180deg' : '0deg',
									}}
								/>
							</IconButton>
						</Tooltip>
						<Divider orientation='vertical' flexItem />
						<ArshinSendingBtn />
						<StyledChip
							icon={<ListIcon />}
							label='Список запросов'
							onClick={handleToggleRequestsList}
							sx={{
								borderRadius: 1,
								border: 0,
								background: open && selector === 'RequestsList' ? 'primary' : '#fff',
							}}
							color={open && selector === 'RequestsList' ? 'primary' : 'default'}
						/>
					</Stack>
					<Stack direction='row' gap={4}>
						<MenuActionsArshin />
					</Stack>
				</Toolbar>
				<Collapse in={expanded} sx={{ width: 1, position: 'relative' }}>
					<ArshinTableToolbarFilter />
				</Collapse>
			</GridToolbarContainer>
		</>
	);
}

export default DataTableArshinToolbar;
