import { dialogContentClasses, dialogTitleClasses, styled } from '@mui/material';
import type { PopoverProps } from '@mui/material/Popover';
import Popover from '@mui/material/Popover';
import { PropsWithChildren } from 'react';

interface LayoutNotificationPopoverProps extends PopoverProps {
	open: boolean;
	anchorEl: Element | null;
	handleClose: VoidFunction;
	notification: boolean;
}

const styles = (notification: boolean) => ({
	padding: 2,
	width: notification ? 528 : 282,
	[`& .${dialogTitleClasses.root}`]: {
		padding: 0,
		mb: 1,
	},
	[`& .${dialogContentClasses.root}`]: {
		padding: 0,
	},
});

const StyledLayoutNotificationPopover = styled(
	({
		open,
		anchorEl,
		handleClose,
		notification,
		children,
	}: PropsWithChildren<LayoutNotificationPopoverProps>) => (
		<Popover
			open={open}
			anchorEl={anchorEl}
			anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
			transformOrigin={{ vertical: 'top', horizontal: 'right' }}
			onClose={handleClose}
			PaperProps={{ sx: styles(notification) }}
		>
			{children}
		</Popover>
	)
)();
export default StyledLayoutNotificationPopover;
