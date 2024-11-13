import { Table, TableBody, TableContainer, Paper } from '@mui/material';

import { useGetPassportData } from '../hooks/useGetPassportData';
import { PASSPORT_MOCK } from '../PASSPORT_MOCK';

import { Organization } from './Organization';
import { Subdivision } from './Subdivision';
import { Summary } from './Summary';
import { Verifications } from './Verifications';

const PassportTable = () => {
	const { division, organization, summaryData, verifications, repairs } = useGetPassportData();

	return (
		<TableContainer component={Paper} sx={{ padding: '20px 50px' }}>
			<Table size='small'>
				<TableBody>
					<Organization organization={organization} />
					<Subdivision subdivision={division} />
					<Summary summaryData={summaryData} />
					<Verifications verifications={verifications} />
				</TableBody>
			</Table>
		</TableContainer>
	);
};

export default PassportTable;
