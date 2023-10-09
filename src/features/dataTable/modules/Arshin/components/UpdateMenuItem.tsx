import CachedIcon from '@mui/icons-material/Cached';
import ExpandIcon from '@mui/icons-material/ExpandMore';
import { Collapse, ListItemIcon, ListItemText, MenuItem } from '@mui/material';
import { useState } from 'react';

import { selectSelectedItemsDone } from '../arshinTableSlice';
import { useArshinActions } from '../hooks/useArshinActions';

import StyledMenuList from 'features/dataTable/styled/StyledMenuList';
import { useAppSelector } from 'hooks/redux';

function UpdateMenuItem() {
	const [updateOpen, setUpdateOpen] = useState(false);

	const selectionItemsDone = useAppSelector(selectSelectedItemsDone);

	const { handleSynchronizeItems, handleSynchronizeItemsIsDone } = useArshinActions();

	const handleUpdateOpen = () => {
		setUpdateOpen(prev => !prev);
	};

	return (
		<>
			<MenuItem disabled={!selectionItemsDone.length} onClick={handleUpdateOpen}>
				<ListItemIcon>
					<CachedIcon />
				</ListItemIcon>
				<ListItemText primary='Обновить' />
				<ExpandIcon
					color='action'
					sx={{
						transition: theme => theme.transitions.create('rotate'),
						rotate: updateOpen ? '180deg' : '0deg',
					}}
				/>
			</MenuItem>
			<Collapse in={updateOpen}>
				<StyledMenuList disablePadding>
					<MenuItem
						disabled={!selectionItemsDone.length}
						onClick={handleSynchronizeItemsIsDone}
					>
						<ListItemText primary='Все' />
					</MenuItem>
					<MenuItem disabled={!selectionItemsDone.length} onClick={handleSynchronizeItems}>
						<ListItemText primary='Выделенное' />
					</MenuItem>
				</StyledMenuList>
			</Collapse>
		</>
	);
}

export default UpdateMenuItem;
