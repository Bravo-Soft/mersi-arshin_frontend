import { useForm } from 'react-hook-form';
import { useAppDispatch } from 'hooks/redux';
import { stringfyTemplate } from 'utils/templateUtils';
import { useGridApiContext } from '@mui/x-data-grid-pro';
import { useCreateTemplateMutation } from './templatesApiSlice';

import type { ITemplateСonfig } from 'types/template';
import type { PopoverProps } from '@mui/material/Popover';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import TextField from '@mui/material/TextField';
import useNotification from 'hooks/useNotification';

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

	const showNotification = useNotification(dispatch);

	const apiRef = useGridApiContext();
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
		watch,
	} = useForm<Pick<ITemplateСonfig, 'templateName'>>();

	const [sendNewTemplate] = useCreateTemplateMutation();

	const isEmpty = !Boolean(watch('templateName'));

	const onSubmit = handleSubmit(async ({ templateName }) => {
		try {
			/* Создание шаблона, его применение и отправка на сервер */
			const template = apiRef.current.exportState();
			const newTemplate: Omit<ITemplateСonfig, 'id'> = {
				templateName,
				isTemplateSelected: true,
				template: stringfyTemplate(apiRef.current.exportState()),
			};
			await sendNewTemplate(newTemplate).unwrap();
			apiRef.current.restoreState(template);

			/* Сброс значения поля ввода и закрытие окна */
			reset();
			onClose();
			showNotification('THE_TEMPLATE_WAS_CREATED_SUCCESSFULLY', 'success');
		} catch {
			showNotification('FAILED_TO_SAVE_TEMPLATE', 'error');
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
