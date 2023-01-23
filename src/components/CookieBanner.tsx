import { blue } from '@mui/material/colors';
import { styled } from '@mui/material/styles';
import { CookieContext } from 'hoc/WithCookie';
import { useContext } from 'react';

import PrivacyTipIcon from '@mui/icons-material/PrivacyTip';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const CookieBannerWrapper = styled('div')(({ theme }) => ({
	...theme.mixins.toolbar,
	display: 'flex',
	position: 'absolute',
	zIndex: theme.zIndex.modal + 1,
	bottom: 0,
	width: '100vw',
	backgroundColor: blue[50],
	borderTop: `1px solid ${blue[200]}`,
	color: blue[700],
	paddingLeft: theme.spacing(3),
	paddingRight: theme.spacing(3),
}));

interface ICookieBannerProps {
	isVisible: boolean;
}

function CookieBanner({ isVisible }: ICookieBannerProps): JSX.Element | null {
	const { acceptCookie } = useContext(CookieContext);

	if (!isVisible) {
		return null;
	}

	return (
		<CookieBannerWrapper>
			<Box display='flex' alignItems='center' columnGap={2} width={1}>
				<PrivacyTipIcon />
				<Typography flexGrow={1}>
					Наш сервис использует файлы cookie для корректной работы. Оставаясь на данном ресурсе
					вы соглашаетесь на их использование
				</Typography>
				<Button sx={{ color: blue[700] }} onClick={acceptCookie}>
					Ок, понятно
				</Button>
			</Box>
		</CookieBannerWrapper>
	);
}

export default CookieBanner;
