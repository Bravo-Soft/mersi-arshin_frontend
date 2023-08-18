import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import GetAppIcon from '@mui/icons-material/GetApp';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { GridToolbarContainer } from '@mui/x-data-grid-pro';
import { Link } from 'react-router-dom';

import { useFilterArshin } from '../hooks/useFilterArshin';
import { useMenuActions } from '../hooks/useMenuActions';

import MenuActionsArshin from './MenuActionsArshin';

import { AppRoutes } from 'constant/appRoutes';
import StyledChip from 'features/dataTable/styled/StyledChip';

function DataTableArshinToolbar(): JSX.Element {
	const { handleGetDataFromFgis } = useMenuActions();

	const [updateArshinFilter, completeDone] = useFilterArshin();

	const handleCompleting = () => {
		updateArshinFilter();
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
						<StyledChip
							label='Готовые'
							variant='filled'
							onClick={handleCompleting}
							color={completeDone ? 'primary' : 'default'}
						/>
					</Stack>
					<Stack direction='row' gap={4}>
						<Button startIcon={<GetAppIcon />} onClick={handleGetDataFromFgis}>
							Запросить данные из ФГИС
						</Button>
						<MenuActionsArshin />
					</Stack>
				</Toolbar>
			</GridToolbarContainer>
		</>
	);
}

export default DataTableArshinToolbar;
