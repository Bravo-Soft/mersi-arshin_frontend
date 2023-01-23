import { useAppSelector } from 'hooks/redux';
import { useResetSelectedId } from 'hooks/useResetSeleсtedDataItem';
import { useSidebarElements } from 'features/sidebar/useSidebarElements';
import { selectSidebarStateOfHomePage } from 'features/sidebar/sidebarSlice';

import PageBox from 'styled/PageBox';
import Sidebar from 'features/sidebar/components/Sidebar';
import SmartDialog from 'features/smartDialog/SmartDialog';
import DataTable from 'features/dataTable/components/DataTable';

function HomePage(): JSX.Element {
	/* Селектор */
	const { open, selector } = useAppSelector(selectSidebarStateOfHomePage);

	/* Хук для сброса выбранного id, см. ниже условие работы */
	useResetSelectedId(selector, open);

	/* Получение всех элементов сайдбара по текущей странице */
	const sidebarElements = useSidebarElements('home');

	return (
		<PageBox position='relative'>
			<DataTable />
			<Sidebar open={open} currentSelector={selector} sidebarElements={sidebarElements} />
			<SmartDialog variant='payment' />
			<SmartDialog variant='deleting' />
		</PageBox>
	);
}

export default HomePage;
