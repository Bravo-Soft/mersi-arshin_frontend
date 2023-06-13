import Collapse from '@mui/material/Collapse';
import List from '@mui/material/List';
import type { PopoverOrigin, PopoverProps } from '@mui/material/Popover';
import Popover from '@mui/material/Popover';
import { TransitionGroup } from 'react-transition-group';

import { useFetchAllTemplatesQuery } from '../templatesApiSlice';

import TemplateItem from './TemplateItem';

const anchorOrigin: PopoverOrigin = {
	vertical: 'top',
	horizontal: 'left',
};

const transformOrigin: PopoverOrigin = {
	vertical: 'top',
	horizontal: 'right',
};

interface ITemplatesList
	extends Omit<PopoverProps, 'onClose' | 'anchorOrigin' | 'transformOrigin' | 'PaperProps'> {
	onClose: () => void;
}

function TemplatesList(props: ITemplatesList): JSX.Element {
	const { onClose, ...other } = props;

	const { data: loadedTemplates } = useFetchAllTemplatesQuery();

	return (
		<>
			<Popover
				{...other}
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
