import AddIcon from '@mui/icons-material/Add';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useFieldArray, useFormContext } from 'react-hook-form';

import { columnsFilters, operatorsFilters } from '../data';

import NotificationFilterItem from './NotificationFilterItem';

import type { INotificationSettings } from 'types/notification';

interface INotificationPopover {
	index: number;
	closeFilters: () => void;
}

function NotificationPopover({ index, closeFilters: handleCloseFilter }: INotificationPopover) {
	const { control } = useFormContext<INotificationSettings>();

	const { fields, append, remove } = useFieldArray({
		control: control,
		name: `subscribedEmails.${index}.emailFilters`,
		keyName: 'id',
	});

	const addNewEmail = () => {
		append({
			columnFilter: columnsFilters[0].field,
			operatorValue: operatorsFilters.defaultFilters[0].operatorValue,
			value: '',
		});
	};

	const removeEmail = (indexRemove: number) => () => {
		remove(indexRemove);
		if (fields.length === 1) {
			handleCloseFilter();
		}
	};

	if (!fields.length) {
		return (
			<Alert
				severity='info'
				action={
					<Button onClick={addNewEmail} startIcon={<AddIcon />}>
						Добавить фильтр
					</Button>
				}
			>
				Не заданы фильтра для данного email
			</Alert>
		);
	}

	return (
		<Box>
			<Box sx={{ maxHeight: 300, overflowY: 'auto' }}>
				{fields.map((e, indexK) => (
					<NotificationFilterItem
						key={e.id}
						index={index}
						indexK={indexK}
						removeEmail={removeEmail}
					/>
				))}
			</Box>
			<Box display='flex' justifyContent='space-between' p='7px'>
				<Button onClick={addNewEmail} startIcon={<AddIcon />}>
					Добавить фильтр
				</Button>
				<Button onClick={handleCloseFilter}>Сохранить фильтр</Button>
			</Box>
		</Box>
	);
}

export default NotificationPopover;
