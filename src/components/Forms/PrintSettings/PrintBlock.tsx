import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { PRINTING_LABEL } from './constants/printingLabels';

import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import type { IPrintingLabel } from './constants/printingLabels';
import type { IPrintSetting, ISendData } from 'types/printSettings';

interface IPrintBlockProps {
	data: IPrintSetting | undefined;
	nameControl: string;
}

const generatorNameControl = (name: string, str: string) => {
	return (name + str) as keyof ISendData;
};

const arrFields: Array<keyof IPrintingLabel> = ['font', 'height', 'width'];

function PrintBlock({ data, nameControl }: IPrintBlockProps) {
	const {
		register,
		setValue,
		formState: { errors },
	} = useFormContext<ISendData>();

	useEffect(() => {
		data &&
			Object.entries(data).forEach(el => {
				if (el[0] !== 'title') {
					setValue(generatorNameControl(nameControl, el[0]), el[1]);
				}
			});
	}, [data, setValue, nameControl]);

	return (
		<Box>
			<Divider textAlign='center'>
				<Typography variant='body1' sx={{ color: 'text.secondary', fontWeight: 500 }}>
					{data?.title} размер бирки
				</Typography>
			</Divider>

			{arrFields.map((el, index) => (
				<TextField
					key={index}
					{...register(generatorNameControl(nameControl, el), {
						valueAsNumber: true,
						min: { value: 0, message: 'Число не может быть отрицательным' },
						required: 'Это поле обязательное',
					})}
					error={Boolean(errors[generatorNameControl(nameControl, el)])}
					helperText={errors[generatorNameControl(nameControl, el)]?.message}
					label={PRINTING_LABEL[el]}
					type='number'
					fullWidth
					sx={{ mt: 0.5 }}
					InputLabelProps={{ shrink: true }}
					InputProps={{
						startAdornment: (
							<InputAdornment position='start'>{el === 'font' ? 'пт' : 'мм'}</InputAdornment>
						),
					}}
				/>
			))}
		</Box>
	);
}

export default PrintBlock;
