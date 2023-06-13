
import CloseIcon from '@mui/icons-material/Close';
import Alert from '@mui/material/Alert';
import { red } from '@mui/material/colors';
import Grow from '@mui/material/Grow';
import IconButton from '@mui/material/IconButton';

interface IErrorTipProps {
	isError: boolean;
	message: string;
	onResetError: () => void;
}

function ErrorTip({ isError, message, onResetError }: IErrorTipProps): JSX.Element | null {
	return (
		<Grow in={isError}>
			<Alert
				variant='standard'
				color='error'
				icon={false}
				sx={{ bgcolor: red[50], color: red[700], borderColor: red[400] }}
				action={
					<IconButton onClick={onResetError}>
						<CloseIcon color='error' />
					</IconButton>
				}
			>
				{message}
			</Alert>
		</Grow>
	);
}

export default ErrorTip;
