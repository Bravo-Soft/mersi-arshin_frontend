import { useGridApiContext } from '@mui/x-data-grid-pro';
import { defaultTemplate } from 'constant/defaultTemplate';
import { useAppDispatch } from 'hooks/redux';
import {
	useGetAllTemplatesQuery,
	useGetSelectedTemplateQuery,
	useUpdateTemplateMutation,
} from '../templatesApiSlice';

import type { PopoverOrigin, PopoverProps } from '@mui/material/Popover';

import List from '@mui/material/List';
import TemplateItem from './TemplateItem';
import Popover from '@mui/material/Popover';
import useNotification from 'hooks/useNotification';
import ListItemButton from '@mui/material/ListItemButton';

export const anchorOrigin: PopoverOrigin = {
	vertical: 'top',
	horizontal: 'left',
};

export const transformOrigin: PopoverOrigin = {
	vertical: 'top',
	horizontal: 'right',
};

interface ITemplatesList
	extends Omit<PopoverProps, 'onClose' | 'anchorOrigin' | 'transformOrigin' | 'PaperProps'> {
	onClose: () => void;
}

function TemplatesList(props: ITemplatesList): JSX.Element {
	const { onClose, ...othen } = props;

	const dispatch = useAppDispatch();
	const apiRef = useGridApiContext();

	const showNotification = useNotification(dispatch);
	const { data: loadedTemplates } = useGetAllTemplatesQuery();
	const [updateTemplate] = useUpdateTemplateMutation();
	const { data: selectedTemplate, isError } = useGetSelectedTemplateQuery();

	const handleSelectDefaultTemplate = async () => {
		try {
			if (selectedTemplate) {
				await updateTemplate({ ...selectedTemplate, isTemplateSelected: false });
				apiRef.current.restoreState(defaultTemplate);
				showNotification('APPLIED_DEFAULT_TEMPLATE', 'info');
			} else {
				apiRef.current.restoreState(defaultTemplate);
				showNotification('DEFAULT_TEMPLATE_RESTORED', 'info');
			}
		} catch {
			showNotification('FAILED_TO_LOADING_TEMPLATE', 'error');
		}
	};

	return (
		<>
			<Popover
				{...othen}
				anchorOrigin={anchorOrigin}
				transformOrigin={transformOrigin}
				onClose={onClose}
				PaperProps={{ sx: { width: 300 } }}
			>
				<List disablePadding sx={{ py: 1 }}>
					<ListItemButton selected={isError} onClick={handleSelectDefaultTemplate}>
						По умолчанию
					</ListItemButton>
					{loadedTemplates?.map(item => (
						<TemplateItem key={item.id} item={item} />
					))}
				</List>
			</Popover>
		</>
	);
}

export default TemplatesList;
