import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import Typography from '@mui/material/Typography';
import { useGridApiContext } from '@mui/x-data-grid-pro';
import { enqueueSnackbar } from 'notistack';
import type { MouseEvent } from 'react';

import {
	useDeleteTemplateByIdMutation,
	useFetchSelectedTemplateQuery,
	useResetSelectedTemplateMutation,
	useSelectTemplateByIdMutation,
} from '../templatesApiSlice';

import { Messages } from 'constant/messages';
import type { ITemplateConfig } from 'types/template';
import { parseTemplate } from 'utils/templateUtils';

interface ITemplateItemProps {
	item: Omit<ITemplateConfig, 'template'>;
}

function TemplateItem({ item }: ITemplateItemProps): JSX.Element {
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
					enqueueSnackbar(Messages.APPLIED_DEFAULT_TEMPLATE, { variant: 'info' });
				} else {
					enqueueSnackbar(Messages.TEMPLATE_SUCCESSFULLY_APPLIED, { variant: 'info' });
				}
			} catch (error) {
				enqueueSnackbar(Messages.FAILED_TO_LOADING_TEMPLATE, { variant: 'error' });
			}
		} else {
			try {
				const resetResult = await resetSelectedTemplate().unwrap();
				const parsedTemplate = parseTemplate(resetResult.template);
				apiRef.current.restoreState(parsedTemplate);

				if (item.templateName === 'По умолчанию') {
					enqueueSnackbar(Messages.DEFAULT_TEMPLATE_RESTORED, { variant: 'info' });
				} else {
					enqueueSnackbar(Messages.TEMPLATE_RESTORED, { variant: 'info' });
				}
			} catch {
				enqueueSnackbar(Messages.FAILED_TO_RESTORE_TEMPLATE, { variant: 'error' });
			}
		}
	};

	const handleDeleteTemplate = async (event: MouseEvent<HTMLButtonElement>) => {
		event.stopPropagation();
		try {
			const deleteResult = await deleteTemplateById(item.id).unwrap();
			apiRef.current.restoreState(parseTemplate(deleteResult.template.trim()));
			enqueueSnackbar(Messages.THE_TEMPLATE_WAS_SUCCESSFULLY_DELETED, { variant: 'success' });
		} catch {
			enqueueSnackbar(Messages.FAILED_TO_DELETE_TEMPLATE, { variant: 'error' });
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
