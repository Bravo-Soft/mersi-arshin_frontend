import { dialogContentClasses, dialogTitleClasses, popoverClasses, styled } from '@mui/material';
import Popover, { PopoverProps } from '@mui/material/Popover';

interface StyledPopoverProps extends PopoverProps {
	hasNotification: boolean;
}

const StyledLayoutNotificationPopover = styled(
	(props: StyledPopoverProps) => (
		<Popover
			{...props}
			anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
			transformOrigin={{ vertical: 'top', horizontal: 'right' }}
		/>
	),
	{
		shouldForwardProp: prop => prop !== 'hasNotification',
	}
)(({ theme, hasNotification }) => ({
	[`& .${popoverClasses.paper}`]: {
		padding: theme.spacing(2),
		width: hasNotification ? 528 : 282,
	},
	[`& .${dialogTitleClasses.root}`]: {
		padding: 0,
		marginBottom: theme.spacing(1),
	},
	[`& .${dialogContentClasses.root}`]: {
		padding: 0,
	},
}));

export default StyledLayoutNotificationPopover;
