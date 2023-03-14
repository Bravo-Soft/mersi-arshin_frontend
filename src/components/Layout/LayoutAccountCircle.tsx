import type { SvgIconComponent } from '@mui/icons-material';
import type { MouseEvent, MouseEventHandler } from 'react';

import { AppRoutes } from 'constant/appRoutes';
import { useLogoutMutation } from 'features/auth/authApiSlice';
import { usePrefetch } from 'features/user/userApiSlice';
import { CookieContext } from 'hoc/WithCookie';
import { useFullscreen } from 'hooks/useFullscreen';
import { usePage } from 'hooks/usePage';
import { useSidebarAction } from 'hooks/useSidebarActions';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { preparePhotoUrl } from 'utils/preparePhotoUrl';
import { useGetPhotoQuery } from 'features/photo/photoApiSlice';

import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import ReviewsIcon from '@mui/icons-material/Reviews';
import SchoolIcon from '@mui/icons-material/School';

import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Skeleton from '@mui/material/Skeleton';
import Tooltip from '@mui/material/Tooltip';
import QuickTourMenu from 'features/quickTour/components/QuickTourMenu';

interface ILayoutAccountCircleMenuItem {
	title: string;
	Icon: SvgIconComponent;
	onClick: MouseEventHandler<HTMLLIElement>;
	disabled?: boolean;
}

interface ILayoutAccountCircleProps {
	setOpenModal: (arg: boolean) => void;
}

function LayoutAccountCircle({ setOpenModal }: ILayoutAccountCircleProps): JSX.Element {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const [anchorTourEl, setAnchorTourEl] = useState<null | HTMLElement>(null);
	const { clearCookie } = useContext(CookieContext);
	const navigate = useNavigate();
	const { data, isLoading, isFetching } = useGetPhotoQuery();

	const page = usePage();
	const { openSidebarWith } = useSidebarAction(page);
	const [isFullscreen, changeFullscreenMode] = useFullscreen();

	const [logout] = useLogoutMutation();
	const prefetchUserProfile = usePrefetch('getUserProfile');

	const photoUrl = preparePhotoUrl(data);
	const open = Boolean(anchorEl);

	const handleClick = (event: MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleLogout = async () => {
		await logout().unwrap();
		clearCookie();
		navigate(AppRoutes.AUTH, { replace: true });
	};

	const handleOpenAccountSettings = () => {
		openSidebarWith('UserProfile');
		handleClose();
	};

	const handlePrefetchUserProfile = () => {
		prefetchUserProfile();
	};

	const handleOpenReview = () => {
		setOpenModal(true);
	};
	const handleOpenTour = (event: MouseEvent<HTMLElement>) => {
		setAnchorTourEl(event.currentTarget);
	};
	const handleCloseTour = () => {
		setAnchorTourEl(null);
	};
	const menuItems: ILayoutAccountCircleMenuItem[] = [
		{
			title: 'Настройка профиля',
			Icon: PersonIcon,
			onClick: handleOpenAccountSettings,
		},
		{
			title: isFullscreen ? 'Выйти из полноэкранного режима' : 'Полноэкранный режим',
			Icon: isFullscreen ? FullscreenExitIcon : FullscreenIcon,
			onClick: changeFullscreenMode,
		},
		{
			title: 'Оставить отзыв',
			Icon: ReviewsIcon,
			onClick: handleOpenReview,
		},
		{
			title: 'Быстрое обучение',
			Icon: SchoolIcon,
			onClick: handleOpenTour,
			disabled: page !== 'home',
		},
	];

	return (
		<>
			<Tooltip title='Открыть панель управления аккаунтом'>
				<IconButton onClick={handleClick}>
					{isLoading || isFetching ? (
						<Skeleton variant='circular' width={40} height={40} />
					) : (
						<Avatar src={photoUrl} />
					)}
				</IconButton>
			</Tooltip>
			<Menu
				anchorEl={anchorEl}
				id='account-menu'
				open={open}
				onClose={handleClose}
				onClick={handleClose}
				transformOrigin={{ horizontal: 'right', vertical: 'top' }}
				anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
			>
				{menuItems.map(({ Icon, title, onClick, disabled }, index) => (
					<MenuItem
						key={title}
						onClick={onClick}
						onMouseEnter={
							title === 'Настройка профиля' ? handlePrefetchUserProfile : undefined
						}
						disabled={disabled}
					>
						<ListItemIcon>
							<Icon />
						</ListItemIcon>
						<ListItemText>{title}</ListItemText>
					</MenuItem>
				))}
				<Divider />
				<MenuItem onClick={handleLogout}>
					<ListItemIcon>
						<LogoutIcon />
					</ListItemIcon>
					<ListItemText>Выйти из системы</ListItemText>
				</MenuItem>
			</Menu>
			<QuickTourMenu anchorTourEl={anchorTourEl} handleCloseTour={handleCloseTour} />
		</>
	);
}

export default LayoutAccountCircle;
