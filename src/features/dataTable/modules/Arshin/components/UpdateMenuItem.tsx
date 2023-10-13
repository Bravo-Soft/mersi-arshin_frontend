import CachedIcon from '@mui/icons-material/Cached';
import ExpandIcon from '@mui/icons-material/ExpandMore';
import { Collapse, ListItemIcon, ListItemText, MenuItem } from '@mui/material';
import { useState } from 'react';

import { selectModelSynchronizeIds, selectSynchronizeIds } from '../arshinTableSlice';
import { useArshinActions } from '../hooks/useArshinActions';

import StyledMenuList from 'features/dataTable/styled/StyledMenuList';
import { useAppSelector } from 'hooks/redux';

interface Props {
	onClose: VoidFunction;
}

function UpdateMenuItem({ onClose }: Props) {
	const [updateOpen, setUpdateOpen] = useState(false);

	const synchronizeModelData = useAppSelector(selectModelSynchronizeIds);

	const synchronizeTableData = useAppSelector(selectSynchronizeIds);

	const { handleModelSynchronize, handleSynchronize } = useArshinActions();

	const handleUpdateOpen = () => {
		setUpdateOpen(prev => !prev);
	};

	const handleAllSynchronize = () => {
		onClose();
		handleSynchronize();
	};
	const handleModelSynchronise = () => {
		handleModelSynchronize();
		onClose();
	};

	return (
		<>
			<MenuItem disabled={!synchronizeTableData.length} onClick={handleUpdateOpen}>
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
					<MenuItem disabled={!synchronizeTableData.length} onClick={handleAllSynchronize}>
						<ListItemText primary='Все' />
					</MenuItem>
					<MenuItem disabled={!synchronizeModelData.length} onClick={handleModelSynchronise}>
						<ListItemText primary='Выделенное' />
					</MenuItem>
				</StyledMenuList>
			</Collapse>
		</>
	);
}

export default UpdateMenuItem;
