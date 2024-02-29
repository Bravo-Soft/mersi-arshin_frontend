import CloseIcon from '@mui/icons-material/Close';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import React from 'react';
import { Control } from 'react-hook-form';

import BaseField from '../../FieldsComponents/BaseField';
import CostFilterField from '../../FieldsComponents/CostFilterField';
import DatePickerFilterField from '../../FieldsComponents/DatePickerFilterField';
import InterVerificationInterval from '../../FieldsComponents/InterVerificationInterval';
import OperatorValueSelect from '../../FieldsComponents/OperatorValueSelect';
import SizeField from '../../FieldsComponents/SizeField';
import SuitabilityField from '../../FieldsComponents/SuitabilityField';
import useNameGenerator from '../hooks/useNameGenerator';
import { useNotificationAction } from '../hooks/useNotificationAction';

import NotificationColumnFilter from './NotificationColumnFilter';
import NotificationLinkOperator from './NotificationLinkOperator';

import type { INotificationSettings } from 'types/notification';

interface INotificationFilterItemProps {
	index: number;
	indexK: number;
	control: Control<INotificationSettings, `subscribedEmails.${number}.emailFilters`>;
	removeEmail: (indexRemove: number) => () => void;
}

function NotificationFilterItem(props: INotificationFilterItemProps) {
	const { index, indexK, removeEmail, control } = props;

	const { linkName, columnName, operatorName, valuerName } = useNameGenerator({ index, indexK });

	const { onChangeColumnField, onChangeOperationField, operatorValueX, watchOperatorValue } =
		useNotificationAction({
			index,
			indexK,
		});

	return (
		<Stack direction='row' p={1} justifyContent='space-between' alignItems='flex-end' spacing={2}>
			<Stack direction='row'>
				<IconButton onClick={removeEmail(indexK)}>
					<CloseIcon />
				</IconButton>
				<NotificationLinkOperator control={control} name={linkName} indexK={indexK} />
			</Stack>
			<Grid container width={478} spacing={0}>
				<Grid item xs={4}>
					<NotificationColumnFilter
						control={control}
						name={columnName}
						onChange={onChangeColumnField}
					/>
				</Grid>
				<Grid item xs={4}>
					<OperatorValueSelect
						control={control}
						name={operatorName}
						operatorValueX={operatorValueX}
						onChange={onChangeOperationField}
					/>
				</Grid>
				<Grid item xs={4}>
					{watchOperatorValue !== 'isEmpty' &&
						(operatorValueX === 'interVerificationInterval' ? (
							<InterVerificationInterval name={valuerName} control={control} />
						) : operatorValueX === 'suitability' ? (
							<SuitabilityField name={valuerName} control={control} />
						) : operatorValueX === 'cost' ? (
							<CostFilterField name={valuerName} control={control} />
						) : operatorValueX === 'dateFilters' ? (
							<DatePickerFilterField control={control} name={valuerName} />
						) : operatorValueX === 'sizesFilters' ? (
							<SizeField control={control} name={valuerName} />
						) : (
							<BaseField control={control} name={valuerName} label='Значение фильтра' />
						))}
				</Grid>
			</Grid>
		</Stack>
	);
}

export default NotificationFilterItem;
