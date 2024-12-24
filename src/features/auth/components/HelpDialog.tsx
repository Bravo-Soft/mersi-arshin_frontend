import HelpIcon from '@mui/icons-material/Help';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { useTheme } from '@mui/material/styles';
import Tooltip from '@mui/material/Tooltip';
import { useState } from 'react';

import HelpInfo from './HelpInfo';

import Dialog from 'components/Dialog';

function HelpDialog(): JSX.Element {
	const [open, setOpen] = useState(false);
	const { spacing } = useTheme();

	const handleToggleDialog = () => {
		setOpen(prev => !prev);
	};

	return (
		<>
			<Tooltip title='Информация' placement='left'>
				<IconButton
					sx={{ position: 'absolute', bottom: spacing(2), right: spacing(2) }}
					onClick={handleToggleDialog}
				>
					<HelpIcon />
				</IconButton>
			</Tooltip>
			<Dialog
				open={open}
				title='Информация'
				content={<HelpInfo />}
				action={<Button onClick={handleToggleDialog}>Закрыть</Button>}
			/>
		</>
	);
}

export default HelpDialog;
