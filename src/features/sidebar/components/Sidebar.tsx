import type { DrawerProps } from '@mui/material/Drawer';

import type { SidebarSelectors } from '../sidebarSlice';
import StyledDrawer from '../StyledDrawer';

import SidebarHeader from './SidebarHeader';

import type { SidebarTitles } from 'constant/sidebarTitles';

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

	return (
		<>
			<StyledDrawer {...othenProps} variant='persistent' anchor='right'>
				<SidebarHeader title={currentElement?.headerTitle} selector={currentSelector} />
				{sidebarElements.map(
					({ selector, Component }) =>
						selector === currentSelector && <Component key={selector} />
				)}
			</StyledDrawer>
		</>
	);
}
