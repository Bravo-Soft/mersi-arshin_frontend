import DataTableArshin from 'features/dataTable/modules/Arshin/components/DataTableArshin';
import FiltersDialog from 'features/dataTable/modules/Arshin/components/FiltersDialog';
import PageBox from 'styled/PageBox';

function ArshinIntegrationPage() {
	return (
		<PageBox>
			<DataTableArshin />
			<FiltersDialog />
		</PageBox>
	);
}

export default ArshinIntegrationPage;
