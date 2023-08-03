import { enqueueSnackbar } from 'notistack';
import type { MouseEvent } from 'react';
import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

import { acceptedFiles as accept } from '../acceptedFiles';

import { useSummarySize } from './useSummarySize';

import { Messages } from 'constant/messages';
import { useLazyDownloadArchiveQuery, useUploadFileMutation } from 'features/files/filesApiSlice';
import { isValueDefined } from 'guards/isValueDefined';
import type { IDocument } from 'types/dataItem';

export interface IUseValidateFileFormProps {
	id?: string | undefined;
	files: File[];
	setFiles: React.Dispatch<React.SetStateAction<File[]>>;
	documents: IDocument[];
	maxSizeOfSpacePerPosition: number;
}

const useValidateFileForm = ({
	maxSizeOfSpacePerPosition,
	id,
	files,
	setFiles,
	documents,
}: IUseValidateFileFormProps) => {
	/* Расчет уже занятого пространства и свободного места */
	const requiredSpace = useSummarySize(files);
	const occupiedSpace = useSummarySize(documents);

	/* Достигнуто ли максимальное доступное место, вместе с имеющимся размером и размером загружаемых файлов */
	const dropzoneDisabled = requiredSpace + occupiedSpace >= maxSizeOfSpacePerPosition;

	/* Методы загрузки и отправки данных */
	const [sendNewFiles, { isLoading }] = useUploadFileMutation();
	const [downloadArchive] = useLazyDownloadArchiveQuery();

	/* Метод вызова диалогового окна ошибки */
	const showFailureMessage = useCallback((errorMessage: keyof typeof Messages) => {
		enqueueSnackbar(Messages[errorMessage], { variant: 'error' });
	}, []);

	/* Метод сохранения файлов в стейт */
	const onDrop = useCallback(
		(acceptedFiles: File[]) => {
			const findByName = (file: File) =>
				files.findIndex((f: File) => f.name === file.name) === -1;
			setFiles([...files, ...acceptedFiles.filter(findByName)]);
		},
		[files, setFiles]
	);

	/* Метод валидации файлов по типу */
	const validator = (file: File) => {
		if (!(file.type in accept)) {
			return {
				code: 'wrong-type',
				message: `FAILED_TO_LARGE_FILE_SIZE`,
			};
		}
		return null;
	};

	const { isDragReject, getRootProps, getInputProps } = useDropzone({
		accept,
		disabled: dropzoneDisabled,
		validator,
		onDrop,
	});

	/* Обработчики */
	const handleRemoveDroppedFile = (name: string) => (event: MouseEvent) => {
		/* Предотвращаем всыплытие */
		event.stopPropagation();

		const filteredFiles = files.filter((file: File) => file.name !== name);
		setFiles(filteredFiles);
	};

	const handleLoadZipArchive = async () => {
		if (isValueDefined(id)) {
			await downloadArchive(id);
		}
	};

	/* Отправка новых файлов */
	const handleSendNewFiles = async () => {
		if (isValueDefined(id)) {
			/* Создаем экземпляр FormData и заполняем данными из состояния */
			const data = new FormData();
			files.forEach((file: File) => data.append('files', file));

			/* Отправляем подготовленную форму */
			await sendNewFiles({ data, itemId: id }).unwrap();
			setFiles([]);
		}
	};

	return {
		state: {
			isLoading,
			isDragReject,
			requiredSpace,
			occupiedSpace,
			dropzoneDisabled,
		},
		dropActions: {
			getRootProps,
			getInputProps,
		},
		actions: {
			handleSendNewFiles,
			handleLoadZipArchive,
			handleRemoveDroppedFile,
		},
		showFailureMessage,
	};
};
export default useValidateFileForm;
