import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { useState } from 'react';

import { isFileExtensionAvailableToPreview } from '../../../../features/documentPreviewer/utils/isExtensionFileAvailableToPreview';
import { acceptedFiles } from '../acceptedFiles';

import Dialog from 'components/Dialog';

const extensions = Object.values(acceptedFiles).flat();
const previewExtensions = extensions?.filter(e => isFileExtensionAvailableToPreview(e?.slice(1)));

function HelperDialog(): JSX.Element {
	/* Состояние */
	const [open, setOpen] = useState(false);

	/* Обработчик */
	const handleToggleHelpDialog = () => {
		setOpen(prev => !prev);
	};

	return (
		<>
			<Tooltip title='Форматы' placement='left'>
				<IconButton onClick={handleToggleHelpDialog}>
					<QuestionMarkIcon />
				</IconButton>
			</Tooltip>
			<Dialog
				open={open}
				onClose={handleToggleHelpDialog}
				title='Форматы'
				content={
					<div>
						<div>Для загрузки - {extensions.join(', ')}</div>
						<div>Для просмотра - {previewExtensions.join(', ')}</div>
					</div>
				}
				action={<Button onClick={handleToggleHelpDialog}>Закрыть</Button>}
			/>
		</>
	);
}

export default HelperDialog;
