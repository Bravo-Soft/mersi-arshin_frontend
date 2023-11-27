import DataTable from 'features/dataTable/components/DataTable';
import Sidebar from 'features/sidebar/components/Sidebar';
import { selectSidebarStateOfHomePage } from 'features/sidebar/sidebarSlice';
import { useSidebarElements } from 'features/sidebar/useSidebarElements';
import SmartDialog from 'features/smartDialog/SmartDialog';
import { useAppSelector } from 'hooks/redux';
import { useResetSelectedId } from 'hooks/useResetSeleсtedDataItem';
import PageBox from 'styled/PageBox';

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
