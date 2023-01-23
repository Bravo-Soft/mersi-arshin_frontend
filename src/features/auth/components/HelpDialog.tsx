import { useState } from 'react';
import { useTheme } from '@mui/material/styles';

import HelpIcon from '@mui/icons-material/Help';

import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Dialog from 'components/Dialog';
import Button from '@mui/material/Button';
import HelpInfo from './HelpInfo';

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
