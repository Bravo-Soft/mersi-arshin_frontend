import Divider from '@mui/material/Divider';
import type { GridColumnMenuProps } from '@mui/x-data-grid-pro';
import {
	GridColumnMenuContainer,
	GridColumnPinningMenuItems,
	GridFilterMenuItem,
	HideGridColMenuItem,
	SortGridMenuItems,
} from '@mui/x-data-grid-pro';

function DataTableColumnMenu({
	hideMenu,
	currentColumn,
	...other
}: GridColumnMenuProps): JSX.Element {
	return (
		<>
			<GridColumnMenuContainer {...other} hideMenu={hideMenu} currentColumn={currentColumn}>
				<SortGridMenuItems onClick={hideMenu} column={currentColumn} />
				<GridFilterMenuItem onClick={hideMenu} column={currentColumn} />
				<HideGridColMenuItem onClick={hideMenu} column={currentColumn} />
				<Divider />
				<GridColumnPinningMenuItems onClick={hideMenu} column={currentColumn} />
			</GridColumnMenuContainer>
		</>
	);
}

export default DataTableColumnMenu;
