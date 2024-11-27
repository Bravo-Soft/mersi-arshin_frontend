import { Box, TextField } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { useState, useRef } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { ColumnNames } from 'constant/columnsName';
import { Condition } from 'constant/condition';
import type { IDataItem } from 'types/dataItem';

interface IConditionSelectProps {
	readOnly?: boolean;
}

function ConditionSelect({ readOnly }: IConditionSelectProps): JSX.Element {
	const { control } = useFormContext<Pick<IDataItem, 'condition' | 'comment'>>();
	// const [comment, setComment] = useState('');
	const commentInputRef = useRef<HTMLInputElement>(null);

	// При изменении статуса на любой, кроме уже установленного или "В работе", запрашиваем комментарий.
	return (
		<FormControl fullWidth variant='standard'>
			<InputLabel id='select-condition-of-label'>{ColumnNames.CONDITION}</InputLabel>
			<Controller
				name='condition'
				control={control}
				render={({ field, fieldState: { error } }) => (
					<>
						<Select
							{...field}
							labelId='select-condition-of-label'
							id='select-condition'
							readOnly={readOnly}
							// onChange={e => {
							// 	field.onChange(e);
							// 	if (e.target.value === Condition.IN_WORK) {
							// 		setComment('');
							// 	} else {
							// 		commentInputRef.current?.focus();
							// 	}
							// }}
						>
							<MenuItem value={Condition.IN_WORK}>{Condition.IN_WORK}</MenuItem>
							<MenuItem value={Condition.UNDER_REPAIR}>{Condition.UNDER_REPAIR}</MenuItem>
							<MenuItem value={Condition.SERVICE}>{Condition.SERVICE}</MenuItem>
							<MenuItem value={Condition.CONSERVATION}>{Condition.CONSERVATION}</MenuItem>
							<MenuItem value={Condition.WRITTEN_OFF}>{Condition.WRITTEN_OFF}</MenuItem>
						</Select>
						<FormHelperText>{error?.message ?? ' '}</FormHelperText>
					</>
				)}
			/>
			<Controller
				name='comment'
				control={control}
				render={({ field, fieldState: { error } }) => (
					<>
						{field.value !== Condition.IN_WORK && (
							<TextField
								{...field}
								inputRef={commentInputRef}
								label='Комментарий'
								// value={comment}
								// onChange={e => setComment(e.target.value)}
								variant='outlined'
								sx={{ marginBottom: 2 }}
								fullWidth
							/>
						)}
						<FormHelperText>{error?.message ?? ' '}</FormHelperText>
					</>
				)}
			/>

			{/* {} */}
		</FormControl>
	);
}

export default ConditionSelect;
