import { TransitionGroup } from 'react-transition-group';

import type { Rename } from 'types/rename';
import type { IDataItem, IDocument } from 'types/dataItem';

import FileItem from './FileItem';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Collapse from '@mui/material/Collapse';
import Typography from '@mui/material/Typography';
import FilesListStyledWrapper from '../styled/FilesListStyledWrapper';

interface IFilesListProps extends Partial<Rename<Pick<IDataItem, 'id'>, 'id', 'itemId'>> {
	documents: IDocument[];
}

function FilesList({ documents, itemId }: IFilesListProps): JSX.Element {
	return (
		<FilesListStyledWrapper>
			{documents.length ? (
				<List sx={{ width: 1 }} dense disablePadding>
					<TransitionGroup>
						{documents.map(document => (
							<Collapse key={document.label}>
								<FileItem document={document} itemId={itemId} />
							</Collapse>
						))}
					</TransitionGroup>
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
