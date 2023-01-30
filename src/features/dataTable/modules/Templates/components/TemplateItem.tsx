import { useGridApiContext } from '@mui/x-data-grid-pro';
import { Messages } from 'constant/messages';
import { showNotification } from 'features/notificator/notificatorSlice';
import { useAppDispatch } from 'hooks/redux';
import { parseTemplate } from 'utils/templateUtils';
import {
	useDeleteTemplateByIdMutation,
	useFetchSelectedTemplateQuery,
	useResetSelectedTemplateMutation,
	useSelectTemplateByIdMutation,
} from '../templatesApiSlice';

import type { MouseEvent } from 'react';
import type { ITemplateСonfig } from 'types/template';

import ListItemButton from '@mui/material/ListItemButton';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import Typography from '@mui/material/Typography';

import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';

interface ITemplateItemProps {
	item: Omit<ITemplateСonfig, 'template'>;
}

function TemplateItem({ item }: ITemplateItemProps): JSX.Element {
	const dispatch = useAppDispatch();
	const apiRef = useGridApiContext();

	const [selectTemplateById] = useSelectTemplateByIdMutation();
	const [resetSelectedTemplate] = useResetSelectedTemplateMutation();
	const [deleteTemplateById] = useDeleteTemplateByIdMutation();
	const { data: selectedConfig } = useFetchSelectedTemplateQuery();

	const handleSelectTemplate = async () => {
		if (selectedConfig?.id !== item.id) {
			try {
				const selectResult = await selectTemplateById(item.id).unwrap();
				const parsedTemplate = parseTemplate(selectResult.template);
				apiRef.current.restoreState(parsedTemplate);
				if (item.templateName === 'По умолчанию') {
					dispatch(
						showNotification({
							message: Messages.APPLIED_DEFAULT_TEMPLATE,
							type: 'info',
						})
					);
				} else {
					dispatch(
						showNotification({
							message: Messages.TEMPLATE_SUCCESSFULLY_APPLIED,
							type: 'info',
						})
					);
				}
			} catch {
				dispatch(
					showNotification({
						message: Messages.FAILED_TO_LOADING_TEMPLATE,
						type: 'error',
					})
				);
			}
		} else {
			try {
				const resetResult = await resetSelectedTemplate().unwrap();
				const parsedTemplate = parseTemplate(resetResult.template);
				apiRef.current.restoreState(parsedTemplate);
				if (item.templateName === 'По умолчанию') {
					dispatch(
						showNotification({
							message: Messages.DEFAULT_TEMPLATE_RESTORED,
							type: 'info',
						})
					);
				} else {
					dispatch(
						showNotification({
							message: Messages.TEMPLATE_RESTORED,
							type: 'info',
						})
					);
				}
			} catch {
				dispatch(
					showNotification({
						message: Messages.FAILED_TO_RESTORE_TEMPLATE,
						type: 'error',
					})
				);
			}
		}
	};

	const handleDeleteTemplate = async (event: MouseEvent<HTMLButtonElement>) => {
		event.stopPropagation();
		try {
			const deleteResult = await deleteTemplateById(item.id).unwrap();
			apiRef.current.restoreState(parseTemplate(deleteResult.template.trim()));
			dispatch(
				showNotification({
					message: Messages.THE_TEMPLATE_WAS_SUCCESSFULLY_DELETED,
					type: 'success',
				})
			);
		} catch {
			dispatch(
				showNotification({
					message: Messages.FAILED_TO_DELETE_TEMPLATE,
					type: 'error',
				})
			);
		}
	};

	return (
		<ListItemButton onClick={handleSelectTemplate} selected={item.isTemplateSelected}>
			<Typography noWrap>{item.templateName}</Typography>
			{item.templateName !== 'По умолчанию' && (
				<ListItemSecondaryAction>
					<IconButton onClick={handleDeleteTemplate}>
						<DeleteIcon />
					</IconButton>
				</ListItemSecondaryAction>
			)}
		</ListItemButton>
	);
}

export default TemplateItem;
