import { Box, TextField } from '@mui/material';
import { useFormContext } from 'react-hook-form';

function CreateRequestDialogTitle() {
	const { register } = useFormContext();

	return (
		<Box sx={{ display: 'flex', alignItems: 'center', padding: '0 16px' }}>
			<TextField
				label='Укажите название запроса'
				fullWidth
				{...register('requestTitle')}
				sx={{
					mt: 2,
					'& .MuiInputBase-input': {
						fontSize: '1.25rem',
						fontWeight: 500,
					},
				}}
			/>
		</Box>
	);
}

export default CreateRequestDialogTitle;
