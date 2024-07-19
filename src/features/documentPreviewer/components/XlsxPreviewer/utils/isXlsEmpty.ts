import { WorkBook } from 'xlsx';

export const isXlsEmpty = (wb: WorkBook): boolean => {
	const sheetNames = wb.SheetNames;
	for (let i = 0; i < sheetNames.length; i++) {
		const ws = wb.Sheets[sheetNames[i]];
		const cellValues = Object.values(ws).filter(cell => typeof cell.v !== 'undefined');
		if (cellValues.length > 0) {
			return false;
		}
	}
	return true;
};
