import { Link } from 'react-router-dom';
import { AppRoutes } from 'constant/appRoutes';

import type { ButtonProps } from '@mui/material/Button';

import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PrintIcon from '@mui/icons-material/Print';

interface IPrintingToolbarProps {
	onPrint: ButtonProps['onClick'];
}

function PrintingToolbar({ onPrint }: IPrintingToolbarProps): JSX.Element {
	return (
		<Toolbar sx={{ justifyContent: 'space-between' }}>
			<Button startIcon={<ArrowBackIcon />} component={Link} to={AppRoutes.HOME}>
				На главную
			</Button>
			<Button onClick={onPrint} endIcon={<PrintIcon />} variant='contained'>
				Печать
			</Button>
		</Toolbar>
	);
}

export default PrintingToolbar;
