import { Messages } from 'constant/messages';
import { changeSmartDialogState } from 'features/smartDialog/smartDialogSlice';
import { selectUserPermissions } from 'features/user/userSlice';
import { isValueDefined } from 'guards/isValueDefined';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { useState } from 'react';
import { useFetchAllTemplatesQuery } from './templatesApiSlice';

import type { MouseEvent } from 'react';
import type { ITemplateConfig } from 'types/template';
import type { IModuleMenuItemProps } from '../moduleMenuItem';

import AddIcon from '@mui/icons-material/Add';
import ExpandIcon from '@mui/icons-material/ExpandMore';
import ListIcon from '@mui/icons-material/List';
import TableViewIcon from '@mui/icons-material/TableView';

import Collapse from '@mui/material/Collapse';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import StyledMenuList from 'features/dataTable/styled/StyledMenuList';
import TemplatesList from './components/TemplatesList';

interface ITemplatesMenuItemProps extends IModuleMenuItemProps {
	onOpenTemplateForm: () => void;
	openTourMenuItems: boolean;
}

const isMaxCountTemplatesReached = (
	templates: Omit<ITemplateConfig, 'template'>[] | undefined,
	maxCount: number | undefined
) => {
	if (templates && isValueDefined(maxCount)) {
		return templates.length >= maxCount;
	}

	return false;
};

function TemplatesMenuItem({
	onOpenTemplateForm,
	onCloseMenu,
	openTourMenuItems = false,
	...othen
}: ITemplatesMenuItemProps): JSX.Element {
	const [nestedMenuIsOpen, setNestedMenuIsOpen] = useState(openTourMenuItems);
	const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

	const dispatch = useAppDispatch();
	const { maxCountTemplates } = useAppSelector(selectUserPermissions);

	const { data: loadedTemplates } = useFetchAllTemplatesQuery();

	const open = Boolean(anchorEl);
	const isReached = isMaxCountTemplatesReached(loadedTemplates, maxCountTemplates);

	const handleOpenTemplatesList = (event: MouseEvent<HTMLLIElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleCloseTemplatesList = () => {
		setAnchorEl(null);
	};

	const handleToggleNestedMenu = () => {
		setNestedMenuIsOpen(prev => !prev);
	};
	//showpyamentnotivijation
	const handleOpenTemplateForm = () => {
		onCloseMenu();
		isReached
			? dispatch(
					changeSmartDialogState({
						variant: 'payment',
						isOpen: true,
						content: Messages.MAX_COUNT_OF_TEMPLATES_IS_REACHED,
					})
			  )
			: onOpenTemplateForm();
	};

	return (
		<>
			<MenuItem onClick={handleToggleNestedMenu} {...othen}>
				<ListItemIcon>
					<TableViewIcon />
				</ListItemIcon>
				<ListItemText>Шаблоны</ListItemText>
				<ExpandIcon
					color='action'
					sx={{
						transition: theme => theme.transitions.create('rotate'),
						rotate: nestedMenuIsOpen ? '180deg' : '0deg',
					}}
				/>
			</MenuItem>
			<Collapse in={nestedMenuIsOpen}>
				<StyledMenuList component='div' disablePadding>
					<MenuItem onClick={handleOpenTemplateForm}>
						<ListItemIcon>
							<AddIcon />
						</ListItemIcon>
						<ListItemText
							primary='Добавить'
							secondary={isReached && `Максимальное кол-во: ${maxCountTemplates} шт`}
						/>
					</MenuItem>
					<MenuItem onClick={handleOpenTemplatesList}>
						<ListItemIcon>
							<ListIcon />
						</ListItemIcon>
						<ListItemText primary='Список шаблонов' />
					</MenuItem>
				</StyledMenuList>
			</Collapse>
			<TemplatesList open={open} onClose={handleCloseTemplatesList} anchorEl={anchorEl} />
		</>
	);
}

export default TemplatesMenuItem;
