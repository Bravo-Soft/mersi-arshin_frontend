import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CachedIcon from '@mui/icons-material/Cached';
import SettingsIcon from '@mui/icons-material/Settings';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { GridToolbarContainer } from '@mui/x-data-grid-pro';
import { Link } from 'react-router-dom';

import { openFilterDialogArshin } from '../filtersDialogSlice';

import { AppRoutes } from 'constant/appRoutes';
import { useAppDispatch } from 'hooks/redux';

function DataTableArshinToolbar(): JSX.Element {
	const dispatch = useAppDispatch();

	const handleOpenFilter = () => {
		dispatch(openFilterDialogArshin());
	};

	const handleRefreshData = () => {
		console.log('Обновить выделенные позиции');
	};

	return (
		<>
			<GridToolbarContainer>
				<Toolbar sx={{ width: 1 }}>
					<Stack
						direction='row'
						alignItems='center'
						flexGrow={1}
						spacing={2}
						divider={<Divider orientation='vertical' flexItem />}
					>
						<Tooltip title='На главную'>
							<IconButton color='primary' component={Link} to={AppRoutes.HOME}>
								<ArrowBackIcon />
							</IconButton>
						</Tooltip>
						<Typography
							color='primary.main'
							variant='h6'
							lineHeight={1.3}
							textOverflow='ellipsis'
							noWrap
						>
							Контроль поверки в Госреестре
						</Typography>
					</Stack>
					<Stack flexDirection='row' gap={4}>
						<Button startIcon={<SettingsIcon />} onClick={handleOpenFilter}>
							Настроить фильтра
						</Button>
						<Button startIcon={<CachedIcon />} onClick={handleRefreshData}>
							Обновить выделенное
						</Button>
					</Stack>
				</Toolbar>
			</GridToolbarContainer>
		</>
	);
}

export default DataTableArshinToolbar;
