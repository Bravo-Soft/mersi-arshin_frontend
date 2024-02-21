import { Slide } from '@mui/material';
import Popper from '@mui/material/Popper';
import { GridApiPro } from '@mui/x-data-grid-pro/models/gridApiPro';
import { MutableRefObject } from 'react';

import { selectIsWorkingArshin } from '../../eventSourceSlice';

import { processConfig } from './processConfig';
import ProcessContent from './ProcessContent';
import { ProcessPaper } from './ProcessPaper';

import { useAppSelector } from 'hooks/redux';

type Props = {
	apiRef: MutableRefObject<GridApiPro>;
};

function ProcessArshin({ apiRef }: Props) {
	const isWorking = useAppSelector(selectIsWorkingArshin);
	const anchor = apiRef?.current?.windowRef?.current;

	if (!anchor) return null;

	return (
		<Popper
			open={isWorking}
			anchorEl={anchor}
			placement='bottom-end'
			modifiers={processConfig}
			disablePortal
			transition
		>
			{({ TransitionProps }) => (
				<Slide {...TransitionProps} timeout={500} direction='up' container={anchor}>
					<ProcessPaper>
						<ProcessContent />
					</ProcessPaper>
				</Slide>
			)}
		</Popper>
	);
}

export default ProcessArshin;
