
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';

import ActionButtons from './components/ActionButtons';
import DroppedFilesList from './components/DroppedFilesList';
import FilesList from './components/FilesList';
import HelperDialog from './components/HelperDialog';
import SpaceNotification from './components/SpaceNotification';
import { convertFileSize } from './convertFileSize';
import useValidateFileForm from './hooks/useDropZoneActions';
import DropZone from './styled/DropZone';

import { selectSelectedDataItem } from 'features/dataTable/dataTableSlice';
import { selectSidebarStateOfHomePage } from 'features/sidebar/sidebarSlice';
import { selectUserPermissions, selectUserRoles } from 'features/user/userSlice';
import { useAppSelector } from 'hooks/redux';
import { useUpdateSelectedDataItem } from 'hooks/useUpdateSelectedDataItem';
import ButtonContainer from 'styled/ButtonContainer';
import FormContainer from 'styled/FormContainer';

function FilesDataItem(): JSX.Element {
	/* Состояние файлов */
	const [files, setFiles] = useState<File[]>([]);

	/* Селекторы */
	const selectedDataItem = useAppSelector(selectSelectedDataItem);
	const { maxSizeOfSpacePerPosition = 0 } = useAppSelector(selectUserPermissions);
	const { isWriter, isAdmin } = useAppSelector(selectUserRoles);
	const { open } = useAppSelector(selectSidebarStateOfHomePage);

	useUpdateSelectedDataItem(selectedDataItem);

	const documents = selectedDataItem?.documents ?? [];

	const {
		state: { isLoading, isDragReject, requiredSpace, occupiedSpace, dropzoneDisabled },
		dropActions: { getRootProps, getInputProps },
		actions: { handleSendNewFiles, handleLoadZipArchive, handleRemoveDroppedFile },
		showFailureMessage,
	} = useValidateFileForm({
		id: selectedDataItem?.id,
		files,
		setFiles,
		documents,
		maxSizeOfSpacePerPosition,
	});

	/* Обработка ошибки недопустимого типа файла */
	useEffect(() => {
		isDragReject && showFailureMessage('FAILED_TO_WRONG_FILE_TIPE');
	}, [isDragReject, showFailureMessage]);

	/* Сброс состояния файлов, если изменятся id или булевый флаг */
	useEffect(() => {
		setFiles([]);
	}, [selectedDataItem, open]);

	/* Достаем обработчик события клика, для дальнейшего прокидывания при условии */
	const { onClick, ...othenProps } = getRootProps();

	return (
		<FormContainer>
			<Box px={3.5} display='flex' flexDirection='column' flexGrow={1}>
				{(isWriter || isAdmin) && (
					<>
						<Typography
							variant='body2'
							component='span'
							sx={{ ml: 1.5, lineHeight: 2.2 }}
							color={dropzoneDisabled ? 'error.main' : 'text.secondary'}
						>
							К загрузке {convertFileSize(requiredSpace, 2)} МБ
						</Typography>
						<DropZone
							{...othenProps}
							onClick={files.length ? undefined : onClick}
							isReject={isDragReject}
							isRejectedShadow={dropzoneDisabled}
						>
							<input {...getInputProps()} />
							<DroppedFilesList
								files={files}
								onDeleteDroppedFile={handleRemoveDroppedFile}
							/>
						</DropZone>
						<Box
							display='flex'
							justifyContent={files.length ? 'space-between' : 'flex-end'}
							my={1}
						>
							<ActionButtons
								disabled={isLoading}
								hasFiles={!!files.length}
								onSaveFiles={handleSendNewFiles}
								onSelectFiles={onClick}
								selectDisabled={dropzoneDisabled}
							/>
							<HelperDialog />
						</Box>
					</>
				)}

				<SpaceNotification
					maxSizeOfSpacePerPosition={maxSizeOfSpacePerPosition}
					occupiedSpace={occupiedSpace}
				/>
				<FilesList documents={documents} itemId={selectedDataItem?.id} />
			</Box>

			<ButtonContainer sx={{ mt: 4 }}>
				<Button
					fullWidth
					variant='contained'
					onClick={handleLoadZipArchive}
					disabled={!documents.length || isLoading}
				>
					Скачать архивом
				</Button>
			</ButtonContainer>
		</FormContainer>
	);
}

export default FilesDataItem;
