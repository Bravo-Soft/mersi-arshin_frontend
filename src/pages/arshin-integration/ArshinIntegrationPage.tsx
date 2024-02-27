import { useActionArshin } from '../../features/dataTable/modules/Arshin/hooks/useActionArshin';

import DataTableArshin from 'features/dataTable/modules/Arshin/components/DataTableArshin';
import DeletingDialog from 'features/dataTable/modules/Arshin/components/Dialog/DeletingDialog';
import FiltersDialog from 'features/dataTable/modules/Arshin/components/Dialog/FiltersDialog';
import SynchronizeDialog from 'features/dataTable/modules/Arshin/components/Dialog/SynchronizeDialog';
import ValidateDialog from 'features/dataTable/modules/Arshin/components/Dialog/ValidateDialog';
import Sidebar from 'features/sidebar/components/Sidebar';
import { selectSidebarStateOfArshinPage } from 'features/sidebar/sidebarSlice';
import { useSidebarElements } from 'features/sidebar/useSidebarElements';
import { useAppSelector } from 'hooks/redux';
import PageBox from 'styled/PageBox';

function ArshinIntegrationPage() {
	useActionArshin();
	/* Селектор */
	const { open, selector } = useAppSelector(selectSidebarStateOfArshinPage);

	/* Получение всех элементов сайдбара по текущей странице */
	const sidebarElements = useSidebarElements('arshin');
	return (
		<PageBox>
			<DataTableArshin />
			<Sidebar open={open} currentSelector={selector} sidebarElements={sidebarElements} />
			<FiltersDialog />
			<DeletingDialog />
			<SynchronizeDialog />
			<ValidateDialog />
		</PageBox>
	);
}

export default ArshinIntegrationPage;
