import DownloadIcon from '@mui/icons-material/Download';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import type { MouseEvent } from 'react';
import { useState } from 'react';

import { getFormatByFilename } from '../../../../features/documentPreviewer/utils/getFormatByFilename';
import { isFileExtensionAvailableToPreview } from '../../../../features/documentPreviewer/utils/isExtensionFileAvailableToPreview';
import { convertFileSize } from '../convertFileSize';

import { DocumentPreview } from 'features/documentPreviewer/components/DocumentPreview';
import { useDeleteFileMutation, useLazyDownloadFileQuery } from 'features/files/filesApiSlice';
import { selectUserRoles } from 'features/user/userSlice';
import { isValueDefined } from 'guards/isValueDefined';
import { useAppSelector } from 'hooks/redux';
import DeleteMenuItem from 'styled/DeleteMenuItem';
import type { IDataItem, IDocument } from 'types/dataItem';
import type { Rename } from 'types/rename';

interface ILoadedFileProps extends Partial<Rename<Pick<IDataItem, 'id'>, 'id', 'itemId'>> {
	document: IDocument;
}

function FileItem({ document, itemId }: ILoadedFileProps): JSX.Element {
	/* Состояние и селектор */
	const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
	const { isWriter, isAdmin } = useAppSelector(selectUserRoles);

	const open = Boolean(anchorEl);

	/* Методы загрузки и удаления */
	const [downloadFile] = useLazyDownloadFileQuery();
	const [deleteFile] = useDeleteFileMutation();

	/* Обработчики  */
	const handleOpenMenu = (event: MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleCloseMenu = () => {
		setAnchorEl(null);
	};

	const handleDeleteFile = async () => {
		handleCloseMenu();
		if (isValueDefined(itemId)) {
			await deleteFile({ itemId, documentId: document.id });
		}
	};

	const handleLoadFile = async () => {
		handleCloseMenu();
		if (isValueDefined(itemId)) {
			await downloadFile({ itemId, documentId: document.id, name: document.label });
		}
	};

	const handlePreviewFile = async () => {
		handleCloseMenu();

		setDocumentPreviewIsOpen(true);
	};

	const closeDocumentPreview = () => {
		setDocumentPreviewIsOpen(false);
	};

	const [documentPreviewIsOpen, setDocumentPreviewIsOpen] = useState(false);

	return (
	<>
		<ListItem>
			<ListItemAvatar>
				<Avatar>
					<InsertDriveFileIcon />
				</Avatar>
			</ListItemAvatar>
			<ListItemText
				primaryTypographyProps={{ noWrap: true }}
				primary={document.label}
				secondary={convertFileSize(document.size, 2) + ' МБ'}
			/>
			<ListItemSecondaryAction>
				<IconButton
					edge='end'
					aria-label='Удалить'
					size='small'
					onClick={isWriter || isAdmin ? handleOpenMenu : handleLoadFile}
				>
					{isWriter || isAdmin ? <MoreHorizIcon /> : <DownloadIcon />}
				</IconButton>
				{(isWriter || isAdmin) && (
					<Menu
						open={open}
						anchorEl={anchorEl}
						onClose={handleCloseMenu}
						sx={{ minWidth: 200 }}
					>
						{isFileExtensionAvailableToPreview(
							getFormatByFilename(document.label)
						) && <MenuItem onClick={handlePreviewFile}>Посмотреть</MenuItem>}
						<MenuItem onClick={handleLoadFile}>Загрузить на ПК</MenuItem>
						<DeleteMenuItem onClick={handleDeleteFile}>Удалить</DeleteMenuItem>
					</Menu>
				)}
			</ListItemSecondaryAction>
		</ListItem>

		{documentPreviewIsOpen && (
			<DocumentPreview
				itemId={itemId}
				documentId={document.id}
				label={document.label}
				close={closeDocumentPreview}
			/>
		)}
	</>
	);
}

export default FileItem;
