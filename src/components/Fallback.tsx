import Container from '@mui/material/Container';

import Loader from './Loader';

function Fallback(): JSX.Element {
	return (
		<Container
			sx={{ height: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
		>
			<Loader />
		</Container>
	);
}

export default Fallback;
