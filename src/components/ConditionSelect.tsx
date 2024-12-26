import { TextField } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { SelectChangeEvent } from '@mui/material/Select';
import { useState, useRef, useEffect } from 'react';
import { Controller, useFormContext, ControllerRenderProps } from 'react-hook-form';

import { ColumnNames } from 'constant/columnsName';
import { Condition } from 'constant/condition';
import type { IDataItem } from 'types/dataItem';

interface IConditionSelectProps {
	readOnly?: boolean;
}

function ConditionSelect({ readOnly }: IConditionSelectProps): JSX.Element {
	const { control, watch, setValue } =
		useFormContext<Pick<IDataItem, 'condition' | 'conditionDescription'>>();
	const commentInputRef = useRef<HTMLInputElement>(null);

	const condition = watch('condition');
	const [previousCondition, setPreviousCondition] = useState(condition);
	const [showComment, setShowComment] = useState(false);

	useEffect(() => {
		if (condition !== previousCondition) {
			if (condition !== Condition.IN_WORK) {
				setShowComment(true);
				commentInputRef.current?.focus();
			} else {
				setShowComment(false);
				setValue('conditionDescription', '');
			}
			setPreviousCondition(condition);
		}
	}, [condition, previousCondition, setValue]);

	const handleConditionChange = (
		field: ControllerRenderProps<
			Pick<IDataItem, 'condition' | 'conditionDescription'>,
			'condition'
		>,
		e: SelectChangeEvent<string>
	) => {
		field.onChange(e);
	};

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
							onChange={e => handleConditionChange(field, e)}
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
				name='conditionDescription'
				control={control}
				render={({ field, fieldState: { error } }) => (
					<>
						{showComment && (
							<TextField
								{...field}
								inputRef={commentInputRef}
								label='Комментарий'
								variant='outlined'
								sx={{ marginBottom: 2 }}
								fullWidth
							/>
						)}
						<FormHelperText>{error?.message ?? ' '}</FormHelperText>
					</>
				)}
			/>
		</FormControl>
	);
}

export default ConditionSelect;
