import CloseIcon from '@mui/icons-material/Close';
import LinearProgress from '@mui/material/LinearProgress';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useState } from 'react';

import { useSendingArshin } from '../../hooks/useSendingArshin';

import PulseButton from './PulseButton';
import { StyledIconButton } from './StyledIconButton';

function ProcessContent() {
	const [closeView, setCloseView] = useState(false);

	const handleEnter = () => setCloseView(true);
	const handleLeave = () => setCloseView(false);
	const { handleCancel } = useSendingArshin();
	return (
		<Stack
			gap={1}
			padding={2}
			direction='row'
			onMouseEnter={handleEnter}
			onMouseLeave={handleLeave}
		>
			<StyledIconButton onClick={handleCancel}>
				{closeView ? <CloseIcon /> : <PulseButton />}
			</StyledIconButton>
			<Stack direction='column' flexGrow={1} gap={0.5}>
				<Typography variant='body1' color='text.secondary'>
					Отправка данных...
				</Typography>
				<LinearProgress sx={{ height: 6, borderRadius: 50 }} />
			</Stack>
		</Stack>
	);
}

export default ProcessContent;
