import HistoryTable from 'features/historyTable/historyTable';
import Sidebar from 'features/sidebar/components/Sidebar';
import { selectSidebarStateOfHistoryPage } from 'features/sidebar/sidebarSlice';
import { useSidebarElements } from 'features/sidebar/useSidebarElements';
import { useGetUserDataQuery } from 'features/user/userApiSlice';
import { useAppSelector } from 'hooks/redux';
import { useResetSelectedId } from 'hooks/useResetSeleсtedDataItem';
import PageBox from 'styled/PageBox';

function HistoryPage(): JSX.Element {
	/* Селектор */
	const { open, selector } = useAppSelector(selectSidebarStateOfHistoryPage);

	/* Хук для сброса выбранного id, см. ниже условие работы */
	useResetSelectedId(selector, open);

	const sidebarElements = useSidebarElements('history');

	useGetUserDataQuery();

	return (
		<PageBox position='relative'>
			<HistoryTable />
			<Sidebar open={open} currentSelector={selector} sidebarElements={sidebarElements} />
		</PageBox>
	);
}

export default HistoryPage;
