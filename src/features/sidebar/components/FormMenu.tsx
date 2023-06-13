import AttachFileIcon from '@mui/icons-material/AttachFile';
import CheckIcon from '@mui/icons-material/Check';
import ContentPasteGoIcon from '@mui/icons-material/ContentPasteGo';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import LockIcon from '@mui/icons-material/Lock';
import IconButton from '@mui/material/IconButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import type { MouseEvent } from 'react';
import { useState } from 'react';

import type { SidebarPages } from '../sidebarSlice';
import { selectSidebarStateOfHomePage } from '../sidebarSlice';

import { Messages } from 'constant/messages';
import { SidebarTitles } from 'constant/sidebarTitles';
import { changeSmartDialogState } from 'features/smartDialog/smartDialogSlice';
import { selectUserPermissions, selectUserRoles } from 'features/user/userSlice';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { useSidebarAction } from 'hooks/useSidebarActions';
import DeleteMenuItem from 'styled/DeleteMenuItem';
import StyledMenuItem from 'styled/StyledMenuItem';

interface IFormMenuProps {
	page: SidebarPages;
}

function FormMenu({ page }: IFormMenuProps): JSX.Element | null {
	const [anchorEl, setAnchorEl] = useState<HTMLElement | null>();
	const open = Boolean(anchorEl);

	const dispatch = useAppDispatch();
	const { isWriter, isAdmin } = useAppSelector(selectUserRoles);
	const { attachFiles } = useAppSelector(selectUserPermissions);
	const { selector } = useAppSelector(selectSidebarStateOfHomePage);

	const { openSidebarWith } = useSidebarAction(page);

	const handleOpenMenu = (event: MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleCloseMenu = () => {
		setAnchorEl(null);
	};

	const handleOpenEditForm = () => {
		openSidebarWith('EditDataItem');
		handleCloseMenu();
	};

	const handleOpenVerificationForm = () => {
		openSidebarWith('VerificateDataItem');
		handleCloseMenu();
	};

	const handleOpenFilesForm = () => {
		attachFiles
			? openSidebarWith('FilesDataItem')
			: dispatch(
					changeSmartDialogState({
						variant: 'payment',
						isOpen: true,
						content: Messages.MODULE_IS_NOT_PAID,
					})
			  );
		handleCloseMenu();
	};

	const handleOpenDeletingDialog = () => {
		dispatch(
			changeSmartDialogState({
				variant: 'deleting',
				isOpen: true,
			})
		);
		handleCloseMenu();
	};

	return (
		<>
			<Tooltip title='Операции с СИ'>
				<IconButton onClick={handleOpenMenu}>
					<ContentPasteGoIcon />
				</IconButton>
			</Tooltip>
			<Menu
				open={open}
				onClose={handleCloseMenu}
				anchorEl={anchorEl}
				anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
				transformOrigin={{ horizontal: 'right', vertical: 'top' }}
			>
				<MenuItem onClick={handleOpenEditForm} selected={selector === 'EditDataItem'}>
					<ListItemIcon>
						<EditIcon />
					</ListItemIcon>
					<ListItemText>
						{isWriter || isAdmin ? SidebarTitles.EDIT_ITEM : SidebarTitles.ITEM_INFORMATION}
					</ListItemText>
				</MenuItem>
				<MenuItem
					onClick={handleOpenVerificationForm}
					selected={selector === 'VerificateDataItem'}
				>
					<ListItemIcon>
						<CheckIcon />
					</ListItemIcon>
					<ListItemText>{SidebarTitles.VERIFICATION_ITEM}</ListItemText>
				</MenuItem>
				<StyledMenuItem
					moduleIsActive={attachFiles}
					onClick={handleOpenFilesForm}
					selected={selector === 'FilesDataItem'}
					divider={isWriter || isAdmin}
				>
					<ListItemIcon>{attachFiles ? <AttachFileIcon /> : <LockIcon />}</ListItemIcon>
					<ListItemText>{SidebarTitles.ITEM_FILES}</ListItemText>
				</StyledMenuItem>
				{(isWriter || isAdmin) && (
					<DeleteMenuItem onClick={handleOpenDeletingDialog}>
						<ListItemIcon>
							<DeleteIcon />
						</ListItemIcon>
						<ListItemText>Удалить</ListItemText>
					</DeleteMenuItem>
				)}
			</Menu>
		</>
	);
}

export default FormMenu;
