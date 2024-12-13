import HistoryTable from 'features/historyTable/historyTable';
import Sidebar from 'features/sidebar/components/Sidebar';
import { selectSidebarStateOfHistoryPage } from 'features/sidebar/sidebarSlice';
import { useSidebarElements } from 'features/sidebar/useSidebarElements';
import { useAppSelector } from 'hooks/redux';
import PageBox from 'styled/PageBox';

function HistoryPage(): JSX.Element {
	/* Селектор */
	const { open, selector } = useAppSelector(selectSidebarStateOfHistoryPage);

	const sidebarElements = useSidebarElements('history');

	return (
		<PageBox position='relative'>
			<HistoryTable />
			<Sidebar open={open} currentSelector={selector} sidebarElements={sidebarElements} />
		</PageBox>
	);
}

export default HistoryPage;
