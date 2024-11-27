import { Table, TableBody, TableContainer } from '@mui/material';

import { IPassportData } from '../types';

import { Divider } from './Divider';
import { Organization } from './Organization';
import { Repairs } from './Repairs';
import { Subdivision } from './Subdivision';
import { Summary } from './Summary';
import { Verifications } from './Verifications';

const PassportTable = ({ tableData }: { tableData: IPassportData }) => {
	const { division, organization, summaryData, verifications, repairs } = tableData;

	return (
		<>
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
		</>
	);
};

export default PassportTable;
