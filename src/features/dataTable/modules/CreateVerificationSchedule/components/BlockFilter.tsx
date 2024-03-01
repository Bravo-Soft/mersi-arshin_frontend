import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import React from 'react';

import ColumnFilterField from '../../../../../components/Forms/FilterForm/components/ColumnFilterField';
import OperatorFilterField from '../../../../../components/Forms/FilterForm/components/OperatorFilterField';
import ValueFilterField from '../../../../../components/Forms/FilterForm/components/ValueFilterField';
import useNameGenerator from '../../../../../components/Forms/FilterForm/hooks/useNameGenerator';
import type { IColumnTable } from '../operatorsFilters';

import { useFilterAction } from 'components/Forms/FilterForm/hooks/useFilterAction';

interface IBlockFilterProps {
	index: number;
	remove: (index: number) => void;
	columnsFilters: IColumnTable[];
}

function BlockFilter({ index, remove, columnsFilters }: IBlockFilterProps) {
	const { columnName, operatorName, valueName, fieldName } = useNameGenerator({
		name: `filters.${index}`,
	});

	const { columnChange, operationChange, operatorValueX, operatorValue } = useFilterAction({
		fieldName,
	});

	const removeFilter = (index: number) => () => {
		remove(index);
	};

	return (
		<Box display='flex' flexDirection='row' justifyContent='space-between' alignItems='center'>
			<IconButton onClick={removeFilter(index)} sx={{ mr: 1 }}>
				<CloseIcon />
			</IconButton>
			<Grid container width='100%' spacing={0}>
				<Grid item xs={4}>
					<ColumnFilterField name={columnName} onChange={columnChange} />
				</Grid>
				<Grid item xs={4}>
					<OperatorFilterField
						name={operatorName}
						operatorValueX={operatorValueX}
						onChange={operationChange}
					/>
				</Grid>
				{operatorValue !== 'isEmpty' && (
					<Grid item xs={4}>
						<ValueFilterField operatorValueX={operatorValueX} valueName={valueName} />
					</Grid>
				)}
			</Grid>
		</Box>
	);
}

export default BlockFilter;
