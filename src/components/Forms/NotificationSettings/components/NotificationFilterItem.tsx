import CloseIcon from '@mui/icons-material/Close';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import React from 'react';

import OperatorValueSelect from '../../FieldsComponents/OperatorValueSelect';
import { useFilterAction } from '../hooks/useFilterAction';
import useNameGenerator from '../hooks/useNameGenerator';

import NotificationColumnFilter from './NotificationColumnFilter';
import NotificationLinkOperator from './NotificationLinkOperator';
import NotificationValueField from './NotificationValueField';

interface INotificationFilterItemProps {
	index: number;
	indexK: number;
	removeEmail: (indexRemove: number) => () => void;
}

function NotificationFilterItem(props: INotificationFilterItemProps) {
	const { index, indexK, removeEmail } = props;

	const { columnName, operatorName, valueName, fieldName } = useNameGenerator({
		name: `subscribedEmails.${index}.emailFilters.${indexK}`,
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
				<NotificationLinkOperator
					name={`subscribedEmails.${index}.linkOperator`}
					indexK={indexK}
				/>
			</Stack>
			<Grid container width={478} spacing={0}>
				<Grid item xs={4}>
					<NotificationColumnFilter name={columnName} onChange={columnChange} />
				</Grid>
				<Grid item xs={4}>
					<OperatorValueSelect
						name={operatorName}
						operatorValueX={operatorValueX}
						onChange={operationChange}
					/>
				</Grid>
				{operatorValue !== 'isEmpty' && (
					<Grid item xs={4}>
						<NotificationValueField operatorValueX={operatorValueX} valueName={valueName} />
					</Grid>
				)}
			</Grid>
		</Stack>
	);
}

export default NotificationFilterItem;
