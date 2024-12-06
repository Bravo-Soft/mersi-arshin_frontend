import { Table, TableBody, TableContainer } from '@mui/material';

import Loader from '../../../../../components/Loader';
import { usePassportData } from '../hooks/usePassportData';

import { Divider } from './Divider';
import { Organization } from './Organization';
import { Repairs } from './Repairs';
import { Subdivision } from './Subdivision';
import { Summary } from './Summary';
import { Verifications } from './Verifications';

const PassportTable = () => {
	const { division, organization, summaryData, verifications, repairs, isFetching } =
		usePassportData();

	return isFetching ? (
		<Loader />
	) : (
		<TableContainer>
			<Table size='small'>
				<TableBody sx={{ border: '2px solid black' }}>
					<Organization organization={organization} />
					<Subdivision subdivision={division} />
					<Divider />
					<Summary summaryData={summaryData} />
					<Divider />
					<Verifications verifications={verifications} />
					<Divider />
					<Repairs repairs={repairs} />
					<Divider />
				</TableBody>
			</Table>
		</TableContainer>
	);
};

export default PassportTable;
