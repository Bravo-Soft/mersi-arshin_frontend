import type { MenuItemProps } from '@mui/material/MenuItem';

export interface IModuleMenuItemProps extends MenuItemProps {
	onCloseMenu: () => void;
}

export interface IModuleMenuItemPropsAndOpenTourProps extends IModuleMenuItemProps {
	openTourMenuItems: boolean;
}
