import { useEffect } from 'react';
import { useAppDispatch } from 'hooks/redux';
import { parseTemplate } from 'utils/templateUtils';
import { useGridApiContext } from '@mui/x-data-grid-pro';
import { defaultTemplate } from 'constant/defaultTemplate';
import {
	useDeleteTemplateMutation,
	useLazyGetTemplateByIdQuery,
	useUpdateTemplateMutation,
} from '../templatesApiSlice';

import type { MouseEvent } from 'react';
import type { ITemplateСonfig } from 'types/template';

import Typography from '@mui/material/Typography';
import useNotification from 'hooks/useNotification';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';

import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

interface ITemplateItemProps {
	item: Omit<ITemplateСonfig, 'template'>;
}

function TemplateItem({ item }: ITemplateItemProps): JSX.Element {
	const { templateName, id, isTemplateSelected } = item;

	const dispatch = useAppDispatch();
	const apiRef = useGridApiContext();

	const showNotification = useNotification(dispatch);

	const [updateTemplate] = useUpdateTemplateMutation();
	const [fetchTemplateById] = useLazyGetTemplateByIdQuery();
	const [deleteTemplate, { isSuccess: isDeletingSuccess }] = useDeleteTemplateMutation();

	const handleSelectTemplate = async () => {
		try {
			/* Получаем выбранный шаблон с сервера и меняем его статус */
			const response = await fetchTemplateById(id).unwrap();
			await updateTemplate({ ...response, isTemplateSelected: true }).unwrap();

			/* Парсим его и вставляем в текущее состояние таблицы */
			const parsedTemplate = parseTemplate(response.template);
			apiRef.current.restoreState(parsedTemplate);
			showNotification('TEMPLATE_SUCCESSFULLY_APPLIED', 'info');
		} catch {
			showNotification('FAILED_TO_LOADING_TEMPLATE', 'error');
		}
	};

	const handleDeleteTemplate = async (event: MouseEvent<HTMLButtonElement>) => {
		try {
			event.stopPropagation();
			await deleteTemplate(id).unwrap();
			showNotification('THE_TEMPLATE_WAS_SUCCESSFULLY_DELETED', 'success');
		} catch {
			showNotification('FAILED_DELETE_ITEM', 'error');
		}
	};

	useEffect(() => {
		/* Если удаление прошло успешно, мы устанавливаем дефолтный шаблон */
		if (isDeletingSuccess) {
			apiRef.current.restoreState(defaultTemplate);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isDeletingSuccess]);

	return (
		<ListItemButton onClick={handleSelectTemplate} selected={isTemplateSelected}>
			<Typography noWrap>{templateName}</Typography>
			<ListItemSecondaryAction>
				<IconButton onClick={handleDeleteTemplate}>
					<DeleteIcon />
				</IconButton>
			</ListItemSecondaryAction>
		</ListItemButton>
	);
}

export default TemplateItem;
