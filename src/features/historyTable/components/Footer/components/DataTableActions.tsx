import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Backdrop from '@mui/material/Backdrop';
import type { SpeedDialProps } from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import type { Theme } from '@mui/material/styles';
import type { MouseEventHandler } from 'react';
import { useState } from 'react';



import StyledSpeedDial from '../styled/StyledSpeedDial';

interface IDataTableActionsProps extends SpeedDialProps {
	actions: IAction[];
}

interface IAction {
	onClick: MouseEventHandler<HTMLDivElement>;
	title: string;
	icon: JSX.Element;
}

function DataTableActions(props: IDataTableActionsProps): JSX.Element | null {
	const { actions, sx, ...othen } = props;
	const [open, setOpen] = useState(false);

	const handleToggleSpeedDial = () => {
		setOpen(prev => !prev);
	};

	const setZIndex = (count: number) => (theme: Theme) => theme.zIndex.appBar + count;
	return (
		<>
			<Backdrop open={open} onClick={handleToggleSpeedDial} sx={{ zIndex: setZIndex(1) }} />
			<StyledSpeedDial
				sx={sx}
				open={open}
				onClick={handleToggleSpeedDial}
				icon={<MoreHorizIcon />}
				{...othen}
			>
				{actions.map(({ title, onClick, icon }) => (
					<SpeedDialAction
						FabProps={{ size: 'small' }}
						key={title}
						icon={icon}
						onClick={onClick}
						tooltipOpen
						tooltipTitle={title}
					/>
				))}
			</StyledSpeedDial>
		</>
	);
}

export default DataTableActions;
