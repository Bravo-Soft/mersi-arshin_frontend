import StarIcon from '@mui/icons-material/Star';
import { styled } from '@mui/material/styles';


const WrappStarIcon = styled(StarIcon)(({ theme }) => ({
	fontSize: 40,
	'&.MuiSvgIcon-root.active': {
		color: theme.palette.warning.light,
	},
	'&.MuiSvgIcon-root.default': {
		color: theme.palette.divider,
	},
}));

export default WrappStarIcon;
