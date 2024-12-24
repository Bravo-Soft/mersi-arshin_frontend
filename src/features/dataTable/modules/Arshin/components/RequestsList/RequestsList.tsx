import { Stack, Typography } from '@mui/material';

import { useGetRequestsListQuery } from '../../arshinTableApiSlice';

import { RequestItem } from './RequestItem';

import Loader from 'components/Loader';

function RequestsList() {
	// const { requestItems = [], isLoading } = useDynamicPolling();
	const { data: requestItems = [], isLoading } = useGetRequestsListQuery(undefined, {
		pollingInterval: 60000,
		refetchOnMountOrArgChange: true,
	});

	return (
		<Stack spacing={2} margin={1}>
			{isLoading ? (
				<Loader />
			) : !requestItems.length ? (
				<Typography display={'flex'} justifyContent='center'>
					Запросы отсутствуют
				</Typography>
			) : (
				requestItems.map(item => <RequestItem key={item.id} {...item} />)
			)}
		</Stack>
	);
}

export default RequestsList;
