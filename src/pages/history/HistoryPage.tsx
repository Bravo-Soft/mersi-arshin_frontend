import HistoryTable from 'features/historyTable/historyTable';
import { useGetUserDataQuery } from 'features/user/userApiSlice';
import PageBox from 'styled/PageBox';

function HistoryPage(): JSX.Element {
	useGetUserDataQuery();

	return (
		<PageBox position='relative'>
			<HistoryTable />
		</PageBox>
	);
}

export default HistoryPage;
