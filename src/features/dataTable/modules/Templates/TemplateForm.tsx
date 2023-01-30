import { useGridApiContext } from '@mui/x-data-grid-pro';
import { Messages } from 'constant/messages';
import { showNotification } from 'features/notificator/notificatorSlice';
import { useAppDispatch } from 'hooks/redux';
import { useForm } from 'react-hook-form';
import { useCreateNewTemplateMutation } from './templatesApiSlice';

import type { PopoverProps } from '@mui/material/Popover';
import type { ITemplateСonfig } from 'types/template';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';

interface ITemplateFormProps
	extends Omit<
		PopoverProps,
		'onClose' | 'anchorOrigin' | 'transformOrigin' | 'PaperProps' | 'anchorEl'
	> {
	onClose: () => void;
}

function TemplateForm(props: ITemplateFormProps): JSX.Element {
	const { onClose, ...othen } = props;
	const dispatch = useAppDispatch();

	const apiRef = useGridApiContext();
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
		watch,
	} = useForm<Pick<ITemplateСonfig, 'templateName'>>();

	const [createNewTemplate] = useCreateNewTemplateMutation();

	const isEmpty = !Boolean(watch('templateName'));

	const onSubmit = handleSubmit(async data => {
		try {
			await createNewTemplate(data);
			dispatch(
				showNotification({
					message: Messages.THE_TEMPLATE_WAS_CREATED_SUCCESSFULLY,
					type: 'success',
				})
			);
			reset();
			onClose();
		} catch {
			dispatch(
				showNotification({
					message: Messages.FAILED_TO_SAVE_TEMPLATE,
					type: 'error',
				})
			);
		}
	});

	const handleReset = () => {
		reset();
	};

	return (
		<Popover
			{...othen}
			onClose={onClose}
			anchorEl={apiRef.current.windowRef?.current}
			PaperProps={{ sx: { p: 1, minWidth: 300, m: '0 auto' } }}
			TransitionProps={{ timeout: 0 }}
		>
			<Box component='form' onSubmit={onSubmit}>
				<TextField
					{...register('templateName', { required: 'Введите название' })}
					label='Название'
					fullWidth
					autoFocus
					error={Boolean(errors.templateName)}
					helperText={errors.templateName?.message}
				/>
				<Stack direction='row' mt={1} justifyContent='space-between'>
					<Button type='submit'>Сохранить</Button>
					<Button onClick={handleReset} disabled={isEmpty}>
						Сброс
					</Button>
				</Stack>
			</Box>
		</Popover>
	);
}

export default TemplateForm;
