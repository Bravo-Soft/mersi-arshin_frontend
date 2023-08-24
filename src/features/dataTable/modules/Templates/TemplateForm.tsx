import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import type { PopoverProps } from '@mui/material/Popover';
import Popover from '@mui/material/Popover';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { useGridApiContext } from '@mui/x-data-grid-pro';
import { enqueueSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';

import { templateResolver } from './templateResolver';
import { useCreateNewTemplateMutation } from './templatesApiSlice';

import { Messages } from 'constant/messages';
import type { ITemplateConfig } from 'types/template';

interface ITemplateFormProps
	extends Omit<
		PopoverProps,
		'onClose' | 'anchorOrigin' | 'transformOrigin' | 'PaperProps' | 'anchorEl'
	> {
	onClose: () => void;
}

function TemplateForm(props: ITemplateFormProps): JSX.Element {
	const { onClose, ...other } = props;

	const apiRef = useGridApiContext();
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
		watch,
	} = useForm<Pick<ITemplateConfig, 'templateName'>>({
		resolver: templateResolver,
	});

	const [createNewTemplate] = useCreateNewTemplateMutation();

	const isEmpty = !watch('templateName');

	const onSubmit = handleSubmit(async data => {
		try {
			await createNewTemplate(data).unwrap();
			enqueueSnackbar(Messages.THE_TEMPLATE_WAS_CREATED_SUCCESSFULLY, { variant: 'success' });
			reset();
			onClose();
		} catch {
			enqueueSnackbar(Messages.FAILED_TO_SAVE_TEMPLATE, { variant: 'error' });
		}
	});

	const handleReset = () => {
		reset();
	};

	return (
		<Popover
			{...other}
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
