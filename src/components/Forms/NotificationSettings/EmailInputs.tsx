import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Popover from '@mui/material/Popover';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';

import NotificationAddButton from './components/NotificationAddButton';
import NotificationPopover from './components/NotificationPopover';

import type { INotificationSettings } from 'types/notification';

const MAX_EMAILS_COUNTS = 15;

function EmailInputs() {
	const {
		control,
		register,
		formState: { errors },
		watch,
	} = useFormContext<INotificationSettings>();

	const { fields, append, remove } = useFieldArray<INotificationSettings, 'subscribedEmails'>({
		control,
		name: 'subscribedEmails',
		keyName: 'id',
	});

	const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
	const [popoverIndex, setPopoverIndex] = useState(0);

	const watchEmailFilters = watch(`subscribedEmails`);

	const open = Boolean(anchorEl);
	const isMaximumNumberOfAddressesReached = fields.length === MAX_EMAILS_COUNTS;

	const addNewEmail = () => {
		append({
			email: '',
			filters: [],
			linkOperator: 'and',
		});
	};

	const removeEmail = (index: number) => () => remove(index);

	const handleClickFilters = (index: number) => (event: React.MouseEvent<HTMLButtonElement>) => {
		setPopoverIndex(index);
		setAnchorEl(event.currentTarget);
	};

	const handleCloseFilters = () => setAnchorEl(null);

	return (
		<Stack gap={1}>
			<Box display='flex' alignItems='center' justifyContent='space-between' py={2}>
				<Typography color='primary.main' variant='h6' lineHeight={1.3}>
					Адреса электронной почты
				</Typography>
				<Tooltip title='Добавить'>
					<IconButton
						sx={{ ml: 1 }}
						onClick={addNewEmail}
						disabled={isMaximumNumberOfAddressesReached}
					>
						<AddIcon />
					</IconButton>
				</Tooltip>
			</Box>
			{fields.length ? (
				fields.map((field, index) => (
					<Stack
						key={field.id}
						direction='row'
						alignItems={errors?.subscribedEmails?.[index] ? 'flex-start' : 'center'}
						columnGap={2}
						flexGrow={1}
					>
						<NotificationAddButton
							watchEmailFilters={watchEmailFilters[index].filters.length}
							handleClickFilters={handleClickFilters}
							index={index}
						/>
						<TextField
							fullWidth
							variant='filled'
							size='small'
							label='Введите адрес'
							{...register(`subscribedEmails.${index}.email` as const)}
							helperText={
								errors.subscribedEmails?.length &&
								errors.subscribedEmails[index]?.email?.message
							}
							error={!!errors.subscribedEmails && !!errors.subscribedEmails[index]}
							InputProps={{
								endAdornment: (
									<InputAdornment position='end'>
										<IconButton size='small' onClick={removeEmail(index)}>
											<DeleteIcon />
										</IconButton>
									</InputAdornment>
								),
							}}
						/>
					</Stack>
				))
			) : (
				<Typography variant='subtitle1' color='text.secondary' textAlign='center'>
					Не добавлено ни одного адреса
				</Typography>
			)}

			{isMaximumNumberOfAddressesReached && (
				<Typography variant='subtitle2' textAlign='center'>
					Максимальное кол-во адресов:{MAX_EMAILS_COUNTS}шт
				</Typography>
			)}
			<Popover
				open={open}
				onClose={handleCloseFilters}
				anchorEl={anchorEl}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'left',
				}}
				transformOrigin={{
					vertical: 'top',
					horizontal: 'left',
				}}
			>
				<NotificationPopover index={popoverIndex} closeFilters={handleCloseFilters} />
			</Popover>
		</Stack>
	);
}
export default EmailInputs;
