import type { SxProps, Theme } from '@mui/material/styles';

import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import StyledScrollButtonBox from 'features/dataTable/styled/StyledScrollButtonBox';

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
interface IScrollButtonGroupProps {
	firstElementIsVisible: boolean;
	lastElementIsVisible: boolean;
	scrollForwardHandler: () => void;
	scrollBackHandler: () => void;
}

function ScrollButtonGroup(props: IScrollButtonGroupProps): JSX.Element | null {
	const { firstElementIsVisible, lastElementIsVisible, scrollForwardHandler, scrollBackHandler } =
		props;

	const stylesScrollBtn: SxProps<Theme> = {
		backgroundColor: 'background.paper',
		height: '100%',
		display: 'flex',
		alignItems: 'center',
		paddingRight: 2,
		paddingLeft: 2,
	};

	return (
		<>
			{!firstElementIsVisible && (
				<StyledScrollButtonBox positionBtn='after'>
					<Box sx={stylesScrollBtn}>
						<IconButton onClick={scrollBackHandler}>
							<ArrowBackIosIcon fontSize='small' />
						</IconButton>
					</Box>
				</StyledScrollButtonBox>
			)}
			{!lastElementIsVisible && (
				<StyledScrollButtonBox positionBtn='before'>
					<Box sx={stylesScrollBtn}>
						<IconButton onClick={scrollForwardHandler}>
							<ArrowForwardIosIcon fontSize='small' />
						</IconButton>
					</Box>
				</StyledScrollButtonBox>
			)}
		</>
	);
}
export default ScrollButtonGroup;
