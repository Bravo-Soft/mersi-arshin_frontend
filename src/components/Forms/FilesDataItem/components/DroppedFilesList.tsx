

import CloudIcon from '@mui/icons-material/Cloud';
import DeleteIcon from '@mui/icons-material/Delete';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import type { MouseEvent } from 'react';

import { convertFileSize } from '../convertFileSize';

interface IDroppedFilesListProps {
	files: File[];
	onDeleteDroppedFile: (name: string) => (event: MouseEvent<HTMLButtonElement>) => void;
}

function DroppedFilesList({ files, onDeleteDroppedFile }: IDroppedFilesListProps): JSX.Element {
	/* Если нет файлов, тогда рендерится иконка с текстом */
	if (!files.length) {
		return (
			<Box display='flex' flexDirection='column' alignItems='center' justifyContent='center'>
				<CloudIcon fontSize='large' color='action' />
				<Typography component='span' variant='body2' color='text.secondary'>
					Нажмите или перетащите файлы
				</Typography>
			</Box>
		);
	}

	return (
		<List sx={{ width: 1 }}>
			{files.map((file: File, index) => (
				<ListItem key={file.name} dense>
					<ListItemAvatar>
						<Avatar>
							<Typography component='span'>{index + 1}</Typography>
						</Avatar>
					</ListItemAvatar>
					<ListItemText
						primaryTypographyProps={{ noWrap: true }}
						primary={file.name}
						secondary={convertFileSize(file.size, 2) + ' МБ'}
					/>
					<ListItemSecondaryAction>
						<IconButton
							edge='end'
							aria-label='Удалить'
							size='small'
							onClick={onDeleteDroppedFile(file.name)}
						>
							<DeleteIcon />
						</IconButton>
					</ListItemSecondaryAction>
				</ListItem>
			))}
		</List>
	);
}

export default DroppedFilesList;
