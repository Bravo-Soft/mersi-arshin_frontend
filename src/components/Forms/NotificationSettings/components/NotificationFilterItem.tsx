import CloseIcon from '@mui/icons-material/Close';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import React from 'react';

import ColumnFilterField from '../../FilterForm/components/ColumnFilterField';
import FilterLinkField from '../../FilterForm/components/FilterLinkField';
import OperatorFilterField from '../../FilterForm/components/OperatorFilterField';
import ValueFilterField from '../../FilterForm/components/ValueFilterField';
import { useFilterAction } from '../../FilterForm/hooks/useFilterAction';
import useNameGenerator from '../../FilterForm/hooks/useNameGenerator';

interface INotificationFilterItemProps {
	index: number;
	indexK: number;
	removeEmail: (indexRemove: number) => () => void;
}

function NotificationFilterItem(props: INotificationFilterItemProps) {
	const { index, indexK, removeEmail } = props;

	const { columnName, operatorName, valueName, fieldName } = useNameGenerator({
		name: `subscribedEmails.${index}.filters.${indexK}`,
	});

	const { columnChange, operationChange, operatorValueX, operatorValue } = useFilterAction({
		fieldName,
	});

	return (
		<Stack direction='row' p={1} justifyContent='space-between' alignItems='flex-end' spacing={2}>
			<Stack direction='row'>
				<IconButton onClick={removeEmail(indexK)}>
					<CloseIcon />
				</IconButton>
				<FilterLinkField name={`subscribedEmails.${index}.linkOperator`} indexK={indexK} />
			</Stack>
			<Grid container width={478} spacing={0}>
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
		</Stack>
	);
}

export default NotificationFilterItem;
