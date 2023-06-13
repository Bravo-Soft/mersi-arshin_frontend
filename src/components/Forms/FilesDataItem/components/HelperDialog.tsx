
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { useState } from 'react';

import { acceptedFiles } from '../acceptedFiles';

import Dialog from 'components/Dialog';

const extensions = Object.values(acceptedFiles).flat();

function HelperDialog(): JSX.Element {
	/* Состояние */
	const [open, setOpen] = useState(false);

	/* Обработчик */
	const handleToggleHelpDialog = () => {
		setOpen(prev => !prev);
	};

	return (
		<>
			<Tooltip title='Информация' placement='left'>
				<IconButton onClick={handleToggleHelpDialog}>
					<QuestionMarkIcon />
				</IconButton>
			</Tooltip>
			<Dialog
				open={open}
				onClose={handleToggleHelpDialog}
				title='Информация'
				content={`Допустимые форматы: ${extensions.join(', ')}`}
				action={<Button onClick={handleToggleHelpDialog}>Закрыть</Button>}
			/>
		</>
	);
}

export default HelperDialog;
