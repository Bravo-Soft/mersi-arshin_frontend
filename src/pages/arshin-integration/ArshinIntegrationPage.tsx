import { useCallback } from 'react';

import DataTableArshin from 'features/dataTable/modules/Arshin/components/DataTableArshin';
import DeletingDialog from 'features/dataTable/modules/Arshin/components/Dialog/DeletingDialog';
import FiltersDialog from 'features/dataTable/modules/Arshin/components/Dialog/FiltersDialog';
import SynchronizeDialog from 'features/dataTable/modules/Arshin/components/Dialog/SynchronizeDialog';
import { useServerSentEvent } from 'features/dataTable/modules/Arshin/hooks/useServerSentEvent';
import PageBox from 'styled/PageBox';

function ArshinIntegrationPage() {
	const callBack = useCallback((event: MessageEvent) => {
		console.log('event', JSON.parse(event.data));
	}, []);

	// useServerSentEvent('', callBack);

	return (
		<PageBox>
			<DataTableArshin />
			<FiltersDialog />
			<DeletingDialog />
			<SynchronizeDialog />
		</PageBox>
	);
}

export default ArshinIntegrationPage;
