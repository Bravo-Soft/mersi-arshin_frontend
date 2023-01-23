import type { IDataItem, IDocument } from 'types/dataItem';
import type { Rename } from 'types/rename';

import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import FilesListStyledWrapper from '../styled/FilesListStyledWrapper';
import FileItem from './FileItem';

interface IFilesListProps extends Partial<Rename<Pick<IDataItem, 'id'>, 'id', 'itemId'>> {
	documents: IDocument[];
}

function FilesList({ documents, itemId }: IFilesListProps): JSX.Element {
	return (
		<FilesListStyledWrapper>
			{documents.length ? (
				<List sx={{ width: 1 }} dense disablePadding>
					{documents.map(document => (
						<FileItem key={document.label} document={document} itemId={itemId} />
					))}
				</List>
			) : (
				<Box
					display='flex'
					flexDirection='column'
					alignItems='center'
					justifyContent='center'
					height={1}
				>
					<Typography variant='body2' color='action.active'>
						Не загружено ни одного файла
					</Typography>
				</Box>
			)}
		</FilesListStyledWrapper>
	);
}

export default FilesList;
