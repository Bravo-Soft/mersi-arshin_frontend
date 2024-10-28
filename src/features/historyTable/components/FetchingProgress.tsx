import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

interface IFetchingPropsProps {
	isFetching: boolean;
}

function FetchingProgress({ isFetching }: IFetchingPropsProps): JSX.Element | null {
	if (!isFetching) {
		return null;
	}

	return (
		<Box
			px={3.5}
			pb={3.5}
			flexGrow={1}
			display='flex'
			justifyContent='center'
			alignItems='center'
		>
			<CircularProgress />
		</Box>
	);
}

export default FetchingProgress;
