import React from "react";
import { Control, Controller, FieldPath, FieldValues } from "react-hook-form";
import TextField from "@mui/material/TextField";
import { ColumnNames } from "../../../constant/columnsName";
import { InputAdornment } from "@mui/material";

type Props<T extends FieldValues> = {
	name: FieldPath<T>;
	control: Control<T>;
};

function CostFilterField<T extends FieldValues>({ name, control }: Props<T>) {
	return (
		<Controller
			control={control}
			name={name}
			render={({ field, fieldState: { error } }) => (
				<TextField
					label={ColumnNames.COST}
					InputLabelProps={{ shrink: true }}
					InputProps={{
						startAdornment: <InputAdornment position='start'>₽</InputAdornment>,
					}}
					inputProps={{
						step: 0.01,
					}}
					type='number'
				/>
			)}
		/>
	);
}

export default CostFilterField;
