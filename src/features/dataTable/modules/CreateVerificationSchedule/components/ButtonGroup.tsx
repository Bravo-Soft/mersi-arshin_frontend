import { Alert, Stack } from '@mui/material';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import type { GridApiPro } from '@mui/x-data-grid-pro/models/gridApiPro';
import { type MutableRefObject } from 'react';
import { useFormContext } from 'react-hook-form';

import type { IForm } from '../operatorsFilters';

import { useAnchor, useDownloadVerification } from './utils/hooks';

interface IButtonGroupProps {
	apiRef: MutableRefObject<GridApiPro>;
}

function ButtonGroup({ apiRef }: IButtonGroupProps) {
	const [anchorEl, handleOpen, handleClose] = useAnchor();
	const open = Boolean(anchorEl);

	const { downloadDataCSV, downloadDataExcel, closeModal } = useDownloadVerification(apiRef);

	const {
		formState: { errors, isValid },
	} = useFormContext<IForm>();

	const isDisabled = !isValid;

	return (
		<DialogActions
			sx={{
				justifyContent: errors.fieldsDate ? 'space-between' : 'flex-end',
				padding: '8px 25px',
			}}
		>
			{errors.fieldsDate && errors.fieldsDate.message && (
				<Alert sx={{ padding: 1, fontSize: '12px' }} icon={false} severity='error'>
					{errors.fieldsDate.message}
				</Alert>
			)}
			<Stack flexDirection='row' gap={1}>
				<Button
					disabled={isDisabled}
					id='basic-button'
					aria-controls={open ? 'basic-menu' : undefined}
					aria-haspopup='true'
					aria-expanded={open ? 'true' : undefined}
					onClick={handleOpen}
				>
					Выгрузить
				</Button>
				<Menu
					id='basic-menu'
					anchorEl={anchorEl}
					open={open}
					onClose={handleClose}
					MenuListProps={{
						'aria-labelledby': 'basic-button',
					}}
				>
					<MenuItem onClick={downloadDataCSV}>Выгрузить в CSV</MenuItem>
					<MenuItem onClick={downloadDataExcel}>Выгрузить в XLSX</MenuItem>
				</Menu>
				<Button onClick={closeModal}>Отменить</Button>
			</Stack>
		</DialogActions>
	);
}

export default ButtonGroup;
