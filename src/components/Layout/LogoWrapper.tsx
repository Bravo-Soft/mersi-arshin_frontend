import Box from '@mui/material/Box';
import type { PropsWithChildren } from 'react';
import { useNavigate } from 'react-router-dom';

import { AppRoutes } from 'constant/appRoutes';

function LogoWrapper({ children }: PropsWithChildren): JSX.Element {
	const navigate = useNavigate();

	const handleNavigateToHomePage = () => {
		navigate(AppRoutes.HOME);
	};

	return (
		<Box
			onClick={handleNavigateToHomePage}
			sx={{
				cursor: 'pointer',
				display: 'flex',
				alignItems: 'flex-end',
				columnGap: 1,
				userSelect: 'none',
			}}
		>
			{children}
		</Box>
	);
}

export default LogoWrapper;
