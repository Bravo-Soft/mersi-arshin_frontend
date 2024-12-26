import type { DrawerProps } from '@mui/material/Drawer';

import type { SidebarSelectors } from '../sidebarSlice';
import StyledDrawer from '../StyledDrawer';

import { EditTabs } from './EditTabs';
import SidebarHeader from './SidebarHeader';

import { SidebarTitles } from 'constant/sidebarTitles';

type Component = () => JSX.Element;

export interface ISidebarElement<T> {
	selector: T;
	Component: Component;
	headerTitle?: SidebarTitles;
}

export interface ISidebarProps extends Omit<DrawerProps, 'variant' | 'anchor'> {
	currentSelector: ISidebarElement<SidebarSelectors>['selector'];
	sidebarElements: ISidebarElement<SidebarSelectors>[];
}

export default function Sidebar(props: ISidebarProps): JSX.Element {
	const { currentSelector, sidebarElements, ...othenProps } = props;
	const currentElement = sidebarElements.find(({ selector }) => selector === currentSelector);

	const anchorType = currentSelector === 'RequestsList' ? 'left' : 'right';

	const editElements = ['EditDataItem', 'VerificateDataItem', 'FilesDataItem'];

	return (
		<>
			<StyledDrawer {...othenProps} variant='persistent' anchor={anchorType}>
				<SidebarHeader title={currentElement?.headerTitle} selector={currentSelector} />
				{editElements.includes(currentSelector) && (
					<EditTabs currentSelector={currentSelector} />
				)}
				{sidebarElements.map(
					({ selector, Component }) =>
						selector === currentSelector && <Component key={selector} />
				)}
			</StyledDrawer>
		</>
	);
}
