import DataTableArshin from 'features/dataTable/modules/Arshin/components/DataTableArshin';
import CreatingRequestDialog from 'features/dataTable/modules/Arshin/components/Dialog/CreatingRequestDialog';
import DeletingDialog from 'features/dataTable/modules/Arshin/components/Dialog/DeletingDialog';
import DeletingRequestDialog from 'features/dataTable/modules/Arshin/components/Dialog/DeletingRequestDialog';
import EditingRequestDialog from 'features/dataTable/modules/Arshin/components/Dialog/EditingRequestDialog';
import SynchronizeDialog from 'features/dataTable/modules/Arshin/components/Dialog/SynchronizeDialog';
import ValidateDialog from 'features/dataTable/modules/Arshin/components/Dialog/ValidateDialog';
import Sidebar from 'features/sidebar/components/Sidebar';
import { selectSidebarStateOfArshinPage } from 'features/sidebar/sidebarSlice';
import { useSidebarElements } from 'features/sidebar/useSidebarElements';
import { useAppSelector } from 'hooks/redux';
import PageBox from 'styled/PageBox';

function ArshinIntegrationPage() {
	/* Селектор */
	const { open, selector } = useAppSelector(selectSidebarStateOfArshinPage);

	/* Получение всех элементов сайдбара по текущей странице */
	const sidebarElements = useSidebarElements('arshin');
	return (
		<PageBox>
			<DataTableArshin />
			<Sidebar open={open} currentSelector={selector} sidebarElements={sidebarElements} />
			<DeletingDialog />
			<SynchronizeDialog />
			<ValidateDialog />
			<CreatingRequestDialog />
			<EditingRequestDialog />
			<DeletingRequestDialog />
		</PageBox>
	);
}

export default ArshinIntegrationPage;
