import { Stack } from '@mui/material';

import { useGetRequestsListQuery } from '../../arshinTableApiSlice';
import { selectRequestsList } from '../../arshinTableSlice';

import { RequestItem } from './RequestItem';

import Loader from 'components/Loader';
import { useAppSelector } from 'hooks/redux';

function RequestsList() {
	const { data, isLoading } = useGetRequestsListQuery();
	const requestsList = useAppSelector(selectRequestsList);

	return (
		<Stack spacing={2} margin={1}>
			{isLoading ? (
				<Loader />
			) : (
				requestsList.map(item => <RequestItem key={item.requestId} {...item} />)
			)}
		</Stack>
	);
}

export default RequestsList;
