import DataTableArshin from 'features/dataTable/modules/Arshin/components/DataTableArshin';
import DeletingDialog from 'features/dataTable/modules/Arshin/components/DeletingDialog';
import FiltersDialog from 'features/dataTable/modules/Arshin/components/FiltersDialog';
import PageBox from 'styled/PageBox';

function ArshinIntegrationPage() {
	return (
		<PageBox>
			<DataTableArshin />
			<FiltersDialog />
			<DeletingDialog />
		</PageBox>
	);
}

export default ArshinIntegrationPage;
