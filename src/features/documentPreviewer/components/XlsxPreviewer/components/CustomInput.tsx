import { FormControl, TextField } from '@mui/material';
import type { ChangeEventHandler } from 'react';

interface ICustomInput {
	label: string;
	value: string;
	handleChangeValue: ChangeEventHandler<HTMLInputElement>;
}

export function CustomInput({ label, value, handleChangeValue }: ICustomInput) {
	return (
		<FormControl sx={{ m: 1, minWidth: 200 }}>
			<TextField
				id='custom-separator'
				label={label}
				type='text'
				value={value}
				onChange={handleChangeValue}
				inputRef={input => input && input.focus()}
				sx={{
					'& .MuiInputBase-input': {
						overflow: 'hidden',
						textOverflow: 'ellipsis',
						paddingRight: '4px',
					},
				}}
			/>
		</FormControl>
	);
}
