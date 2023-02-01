import { TransitionGroup } from 'react-transition-group';
import { useFetchAllTemplatesQuery } from '../templatesApiSlice';

import type { PopoverOrigin, PopoverProps } from '@mui/material/Popover';

import List from '@mui/material/List';
import TemplateItem from './TemplateItem';
import Popover from '@mui/material/Popover';
import Collapse from '@mui/material/Collapse';

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

	const { data: loadedTemplates } = useFetchAllTemplatesQuery();

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
					<TransitionGroup>
						{loadedTemplates?.map(item => (
							<Collapse key={item.id}>
								<TemplateItem item={item} />
							</Collapse>
						))}
					</TransitionGroup>
				</List>
			</Popover>
		</>
	);
}

export default TemplatesList;
