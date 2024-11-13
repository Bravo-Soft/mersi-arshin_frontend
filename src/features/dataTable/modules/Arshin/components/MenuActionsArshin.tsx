import CachedIcon from '@mui/icons-material/Cached';
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandIcon from '@mui/icons-material/ExpandMore';
import { MenuItem } from '@mui/material';
import Button from '@mui/material/Button';
import red from '@mui/material/colors/red';
import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/material/Menu';

import {
	selectModelSynchronizeIds,
	selectSelectedDataIds,
	selectSynchronizeIds,
} from '../arshinTableSlice';
import { selectIsWorkingArshin } from '../eventSourceSlice';
import { useArshinActions } from '../hooks/useArshinActions';
import { useMenuActions } from '../hooks/useMenuActions';

import { useAppSelector } from 'hooks/redux';

function MenuActionsArshin() {
	const selectionIds = useAppSelector(selectSelectedDataIds);

	const { anchorEl, open, handleCloseMenu, handleOpenMenu } = useMenuActions();
	const { handleDeleteItems } = useArshinActions();

	const isWorking = useAppSelector(selectIsWorkingArshin);

	const isDeleteActive = Boolean(selectionIds.length);

	const handleRemoveItems = async () => {
		await handleDeleteItems();
		handleCloseMenu();
	};

	const synchronizeModelData = useAppSelector(selectModelSynchronizeIds);

	const synchronizeTableData = useAppSelector(selectSynchronizeIds);

	const { handleModelSynchronize, handleSynchronize } = useArshinActions();

	const handleAllSynchronize = () => {
		handleCloseMenu();
		handleSynchronize();
	};

	const handleModelSynchronise = () => {
		handleModelSynchronize();
		handleCloseMenu();
	};

	return (
		<>
			<Button
				disabled={isWorking}
				startIcon={<CachedIcon />}
				endIcon={
					<ExpandIcon
						sx={{
							transition: theme => theme.transitions.create('rotate'),
							rotate: open ? '180deg' : '0deg',
						}}
					/>
				}
				onClick={handleOpenMenu}
			>
				Перезаписать данные в МерСИ
			</Button>
			<Button
				disabled={!isDeleteActive}
				startIcon={<DeleteIcon />}
				onClick={handleRemoveItems}
				sx={{
					':hover': {
						backgroundColor: red[50],
						color: red[700],
						'& .MuiSvgIcon-root': {
							color: red[700],
						},
					},
				}}
			>
				Удалить выделенное
			</Button>
			<Menu open={open} onClose={handleCloseMenu} anchorEl={anchorEl}>
				<MenuItem disabled={!synchronizeTableData.length} onClick={handleAllSynchronize}>
					<ListItemText primary='Все' />
				</MenuItem>
				<MenuItem disabled={!synchronizeModelData.length} onClick={handleModelSynchronise}>
					<ListItemText primary='Выделенное' />
				</MenuItem>
			</Menu>
		</>
	);
}

export default MenuActionsArshin;
