import { listItemTextClasses, styled, typographyClasses } from '@mui/material';
import ListItem from '@mui/material/ListItem';

const StyledLayoutNotificationListItem = styled(ListItem)(({ theme }) => ({
	borderRadius: theme.shape.borderRadius,
	backgroundColor: theme.palette.grey[50],
	alignItems: 'end',
	border: `1px solid ${theme.palette.divider}`,
	':hover': {
		backgroundColor: theme.palette.action.hover,
	},

	[`& .${listItemTextClasses.primary}`]: {
		fontWeight: 500,
		color: theme.palette.text.primary,
	},
	[`& .${listItemTextClasses.secondary}`]: {
		fontWeight: 400,
		color: theme.palette.text.secondary,
	},
	[`& .${typographyClasses.button}`]: {
		color: theme.palette.text.primary,
		padding: theme.spacing(1),
		lineHeight: 1,
		fontSize: 13,
	},
}));
export default StyledLayoutNotificationListItem;
