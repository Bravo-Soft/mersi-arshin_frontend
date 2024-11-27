import type { DialogProps as MuiDialogProps } from '@mui/material/Dialog';
import MuiDialog from '@mui/material/Dialog';
import MuiDialogActions from '@mui/material/DialogActions';
import MuiDialogContent from '@mui/material/DialogContent';
import MuiDialogContentText from '@mui/material/DialogContentText';
import MuiDialogTitle from '@mui/material/DialogTitle';

interface IDialogProps extends MuiDialogProps {
	title?: string;
	content?: string | JSX.Element;
	action?: JSX.Element;
}

function Dialog(props: IDialogProps): JSX.Element {
	const { action, title, content, ...othen } = props;

	return (
		<MuiDialog {...othen}>
			<MuiDialogTitle>{title}</MuiDialogTitle>
			<MuiDialogContent>
				{typeof content === 'string' ? (
					<MuiDialogContentText>{content}</MuiDialogContentText>
				) : (
					content
				)}
			</MuiDialogContent>
			<MuiDialogActions>{action}</MuiDialogActions>
		</MuiDialog>
	);
}

export default Dialog;
