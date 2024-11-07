import DoneIcon from '@mui/icons-material/Done';
import EditIcon from '@mui/icons-material/Edit';
import { Box, DialogTitle, IconButton, TextField } from '@mui/material';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';

function CreateRequestDialogTitle() {
	const [isTitleEditing, setIsTitleEditing] = useState<boolean>(false);

	const methods = useFormContext();

	const { watch } = methods;
	const requestTitle = watch('requestTitle');

	const handleEditTitle = () => setIsTitleEditing(!isTitleEditing);

	return (
		<Box sx={{ display: 'flex', alignItems: 'center', padding: '0 16px' }}>
			{isTitleEditing ? (
				<TextField
					fullWidth
					required
					{...methods.register('requestTitle')}
					sx={{
						'& .MuiInputBase-input': {
							fontSize: '1.25rem',
							fontWeight: 500,
							padding: '16px',
						},
						'& .MuiOutlinedInput-root': {
							margin: '-14px 0',
						},
					}}
				/>
			) : (
				<DialogTitle sx={{ padding: '16px', margin: 0 }}>{requestTitle}</DialogTitle>
			)}
			<IconButton onClick={handleEditTitle}>
				{isTitleEditing ? <DoneIcon /> : <EditIcon />}
			</IconButton>
		</Box>
	);
}

export default CreateRequestDialogTitle;
