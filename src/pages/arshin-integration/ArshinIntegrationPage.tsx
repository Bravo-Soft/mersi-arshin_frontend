import Button from '@mui/material/Button';
import { useState } from 'react';

import FiltersDialog from 'features/dataTable/modules/Arshin/components/FiltersDialog';
import PageBox from 'styled/PageBox';

function ArshinIntegrationPage() {
	const [isOpenFiltersDialog, setOpenFiltersDialog] = useState(false);

	const handleOpenFilter = () => {
		setOpenFiltersDialog(true);
	};

	const handleClose = () => {
		setOpenFiltersDialog(false);
	};

	return (
		<PageBox>
			ArshinIntegrationTable
			<FiltersDialog isOpenFiltersDialog={isOpenFiltersDialog} handleClose={handleClose} />
			<Button onClick={handleOpenFilter}>Открыть фильтра</Button>
		</PageBox>
	);
}

export default ArshinIntegrationPage;
