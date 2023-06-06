import { useAnchor, useDownloadVerification } from './utils/hooks';
import { useFormContext } from 'react-hook-form';
import { checkIsDisabledBtn } from './utils/helpers';

import type { GridApiPro } from '@mui/x-data-grid-pro/models/gridApiPro';
import type { MutableRefObject } from 'react';
import type { IForm } from '../operatorsFilters';

import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import DialogActions from '@mui/material/DialogActions';
interface IButtonGroupProps {
	apiRef: MutableRefObject<GridApiPro>;
}

function ButtonGroup({ apiRef }: IButtonGroupProps) {
	const [anchorEl, handleOpen, handleClose] = useAnchor();
	const open = Boolean(anchorEl);

	const { downloadDataCSV, downloadDataExcel, closeModal } = useDownloadVerification(apiRef);

	const { watch } = useFormContext<IForm>();
	const { fieldsDate } = watch();

	const isDisabled = checkIsDisabledBtn(fieldsDate);

	return (
		<DialogActions>
			<Button
				disabled={!isDisabled}
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
			<Button onClick={closeModal}>Закрыть</Button>
		</DialogActions>
	);
}

export default ButtonGroup;
