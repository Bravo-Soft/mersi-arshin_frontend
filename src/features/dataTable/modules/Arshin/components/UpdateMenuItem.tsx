import CachedIcon from '@mui/icons-material/Cached';
import ExpandIcon from '@mui/icons-material/ExpandMore';
import { Collapse, ListItemIcon, ListItemText, MenuItem } from '@mui/material';
import { useState } from 'react';

import { selectSelectedItemsDone } from '../arshinTableSlice';
import { useArshinActions } from '../hooks/useArshinActions';

import StyledMenuList from 'features/dataTable/styled/StyledMenuList';
import { useAppSelector } from 'hooks/redux';

interface Props {
	onClose: VoidFunction;
}

function UpdateMenuItem({ onClose }: Props) {
	const [updateOpen, setUpdateOpen] = useState(false);

	const selectionItemsDone = useAppSelector(selectSelectedItemsDone);

	const { handleSynchronizeItems, handleSynchronizeItemsIsDone } = useArshinActions();

	const handleUpdateOpen = () => {
		setUpdateOpen(prev => !prev);
	};

	const handleAllSynchronize = () => {
		onClose();
		handleSynchronizeItemsIsDone();
	};
	const handleModelSynchronise = () => {
		handleSynchronizeItems();
		onClose();
	};

	return (
		<>
			<MenuItem disabled={!selectionItemsDone.length} onClick={handleUpdateOpen}>
				<ListItemIcon>
					<CachedIcon />
				</ListItemIcon>
				<ListItemText primary='Перезаписать данные в МерСИ' />
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
					<MenuItem disabled={!selectionItemsDone.length} onClick={handleAllSynchronize}>
						<ListItemText primary='Все' />
					</MenuItem>
					<MenuItem disabled={!selectionItemsDone.length} onClick={handleModelSynchronise}>
						<ListItemText primary='Выделенное' />
					</MenuItem>
				</StyledMenuList>
			</Collapse>
		</>
	);
}

export default UpdateMenuItem;
