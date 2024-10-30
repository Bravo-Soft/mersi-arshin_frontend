import { type SelectChangeEvent, Box } from '@mui/material';
import type { ChangeEventHandler } from 'react';

import type { SelectableValues } from '../types/selectableValues';

import { CustomInput } from './CustomInput';
import { CustomSelect } from './CustomSelect';

interface ICustomHeader {
	encodings: SelectableValues;
	separators: SelectableValues;
	encoding: string;
	handleChangeEncoding: (event: SelectChangeEvent) => void;
	defaultEncoding: string;
	separator: string;
	handleChangeSeparator: (event: SelectChangeEvent) => void;
	defaultSeparator: string;
	customSeparator: string;
	handleChangeCustomSeparator: ChangeEventHandler<HTMLInputElement>;
	isVisibleCustomSeparatorInput: boolean;
}

export function CustomHeader({
	encodings,
	separators,
	encoding,
	handleChangeEncoding,
	defaultEncoding,
	separator,
	handleChangeSeparator,
	defaultSeparator,
	customSeparator,
	handleChangeCustomSeparator,
	isVisibleCustomSeparatorInput,
}: ICustomHeader) {
	return (
		<Box
			sx={{
				maxWidth: '100%',
				maxHeight: '100%',
				bgcolor: 'background.paper',
				borderRadius: '0',
			}}
		>
			<CustomSelect
				label='Кодировка'
				values={encodings}
				value={encoding}
				handleChangeValue={handleChangeEncoding}
				defaultValue={defaultEncoding}
			/>

			<CustomSelect
				label='Разделитель'
				values={separators}
				value={separator}
				handleChangeValue={handleChangeSeparator}
				defaultValue={defaultSeparator}
			/>

			{isVisibleCustomSeparatorInput && (
				<CustomInput
					label='Введите разделитель'
					value={customSeparator}
					handleChangeValue={handleChangeCustomSeparator}
				/>
			)}
		</Box>
	);
}
