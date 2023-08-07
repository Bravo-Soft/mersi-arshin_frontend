import AppBar from '@mui/material/AppBar';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import LayoutAccountCircle from './LayoutAccountCircle';
import LayoutButtonNotification from './LayoutButtonNotification';
import LayoutLogo from './LayoutLogo';
import LogoWrapper from './LogoWrapper';

interface ILayoutHeaderProps {
	setOpenModal: (arg: boolean) => void;
}

function LayoutHeader({ setOpenModal }: ILayoutHeaderProps): JSX.Element {
	const { palette } = useTheme();
	return (
		<AppBar>
			<Toolbar sx={{ justifyContent: 'space-between' }}>
				<LogoWrapper>
					<LayoutLogo
						primary={palette.common.white}
						secondary='#B30027'
						width={36}
						height={36}
					/>
					<Typography
						fontFamily='Quicksand'
						fontWeight={700}
						fontSize={45}
						letterSpacing={2.2}
						component='span'
						lineHeight={0.8}
					>
						МЕРСИ
					</Typography>
				</LogoWrapper>
				<Stack direction='row' alignItems='center' columnGap={2}>
					<LayoutButtonNotification />
					<LayoutAccountCircle setOpenModal={setOpenModal} />
				</Stack>
			</Toolbar>
		</AppBar>
	);
}

export default LayoutHeader;
