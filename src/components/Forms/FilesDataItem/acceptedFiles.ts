import type { Accept } from 'react-dropzone';

export const acceptedFiles: Accept = {
	'application/msword': ['.doc'],
	'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
	'application/vnd.ms-excel': ['.xls'],
	'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
	'application/pdf': ['.pdf'],
	'image/png': ['.png'],
	'image/jpeg': ['.jpeg', '.jpg'],
	'text/csv': ['.csv'],
};
