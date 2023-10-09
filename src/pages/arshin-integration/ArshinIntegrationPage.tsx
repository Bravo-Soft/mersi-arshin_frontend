import DataTableArshin from 'features/dataTable/modules/Arshin/components/DataTableArshin';
import DeletingDialog from 'features/dataTable/modules/Arshin/components/Dialog/DeletingDialog';
import FiltersDialog from 'features/dataTable/modules/Arshin/components/Dialog/FiltersDialog';
import SynchronizeDialog from 'features/dataTable/modules/Arshin/components/Dialog/SynchronizeDialog';
import { useSendingAction } from 'features/dataTable/modules/Arshin/hooks/useSendingAction';
import PageBox from 'styled/PageBox';

function ArshinIntegrationPage() {
	useSendingAction();

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
