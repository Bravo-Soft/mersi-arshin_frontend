import { useEffect, useState } from 'react';

import { useGetRequestsListQuery } from '../arshinTableApiSlice';

export const useDynamicPolling = () => {
	const [pollingInterval, setPollingInterval] = useState(5000);

	const {
		data: requestItems,
		refetch,
		isLoading,
	} = useGetRequestsListQuery(undefined, {
		pollingInterval: pollingInterval,
		refetchOnMountOrArgChange: true,
	});

	useEffect(() => {
		setPollingInterval(prev => Math.min(prev + 5000, 30000));
	}, []);

	return { requestItems, refetch, isLoading };
};
