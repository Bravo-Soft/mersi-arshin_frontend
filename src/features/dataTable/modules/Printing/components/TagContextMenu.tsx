import { useState } from 'react';
import { hideScrollbar } from 'utils/hideScrollbar';

import type { ISortedTagItems } from '../utils/printingSort';
import type { ICoordinates } from 'features/dataTable/hooks/useContextMenuActions';

import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import ListItemText from '@mui/material/ListItemText';
import SearchOffIcon from '@mui/icons-material/SearchOff';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';

interface ITagContextMenuProps {
	activeTag: ISortedTagItems;
	coordinates: ICoordinates | null;
	handleClose: () => void;
	handleClickPrintingContextMenu: (idx: string, name: string) => void;
}

function TagContextMenu({
	activeTag,
	handleClose,
	handleClickPrintingContextMenu,
	coordinates,
}: ITagContextMenuProps) {
	const [renderPrintingValue, setRenderPrintingValue] = useState(activeTag.tagsPrint);
	const [fieldValue, setFieldValue] = useState('');

	const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
		event.preventDefault();
		setRenderPrintingValue(
			activeTag.tagsPrint.filter(e =>
				e.translatedKey.toLowerCase().trim().includes(event.target.value.toLowerCase().trim())
			)
		);
		setFieldValue(event.target.value);
	};

	const onClickMenuContext =
		(idx: string, name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
			handleClickPrintingContextMenu(idx, name);
			setRenderPrintingValue(prev =>
				prev.map(e => (e.translatedKey === name ? { ...e, isVisible: !e.isVisible } : e))
			);
		};
	const handleOnKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => () => e.stopPropagation();

	return (
		<Menu
			open={Boolean(coordinates)}
			onClose={handleClose}
			anchorReference='anchorPosition'
			anchorPosition={
				coordinates ? { top: coordinates.mouseY, left: coordinates.mouseX } : undefined
			}
			PaperProps={{ sx: { display: 'flex', height: 310, width: 240, ...hideScrollbar() } }}
			MenuListProps={{
				sx: { display: 'flex', flexDirection: 'column', flexGrow: 1, p: 0 },
			}}
		>
			<MenuItem dense>
				<TextField
					fullWidth
					placeholder='Значение фильтра'
					onChange={handleSearch}
					size='small'
					value={fieldValue}
					onKeyDown={handleOnKeyDown}
				/>
			</MenuItem>

			{renderPrintingValue.length ? (
				renderPrintingValue.map(e => (
					<MenuItem key={e.translatedKey} dense>
						<FormControlLabel
							sx={{ m: 0, width: '100%' }}
							control={
								<Switch
									edge='start'
									size='small'
									checked={e.isVisible}
									onChange={onClickMenuContext(activeTag.id, e.translatedKey)}
									tabIndex={-1}
									disableRipple
									inputProps={{
										'aria-labelledby': 'switch-list-label-wifi',
									}}
								/>
							}
							label={<ListItemText id={e.translatedKey} primary={e.translatedKey} />}
						/>
					</MenuItem>
				))
			) : (
				<Box
					display='flex'
					flexDirection='column'
					alignItems='center'
					justifyContent='center'
					flexGrow={1}
				>
					<SearchOffIcon /> <Typography component='span'>Значение не найдено</Typography>
				</Box>
			)}
		</Menu>
	);
}

export default TagContextMenu;

// import { useState } from 'react';
// import { hideScrollbar } from 'utils/hideScrollbar';

// import type { ISortedTagItems } from '../utils/printingSort';
// import type { ICoordinates } from 'features/dataTable/hooks/useContextMenuActions';

// import Box from '@mui/material/Box';
// import Menu from '@mui/material/Menu';
// import MenuItem from '@mui/material/MenuItem';
// import Switch from '@mui/material/Switch';
// import TextField from '@mui/material/TextField';
// import ListItemText from '@mui/material/ListItemText';
// import SearchOffIcon from '@mui/icons-material/SearchOff';
// import Typography from '@mui/material/Typography';
// import FormControlLabel from '@mui/material/FormControlLabel';

// interface ITagContextMenuProps {
// 	activeTag: ISortedTagItems;
// 	coordinates: ICoordinates | null;
// 	handleClose: () => void;
// 	handleClickPrintingContextMenu: (idx: string, name: string) => void;
// }

// function TagContextMenu({
// 	activeTag,
// 	handleClose,
// 	handleClickPrintingContextMenu,
// 	coordinates,
// }: ITagContextMenuProps) {
// 	const [renderPrintingValue, setRenderPrintingValue] = useState(activeTag.tagsPrint);
// 	const [fieldValue, setFieldValue] = useState('');

// 	const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
// 		event.preventDefault();
// 		setRenderPrintingValue(
// 			activeTag.tagsPrint.filter(e =>
// 				e.translatedKey.toLowerCase().trim().includes(event.target.value.toLowerCase().trim())
// 			)
// 		);
// 		setFieldValue(event.target.value);
// 	};

// 	const onClickMenuContext =
// 		(idx: string, name: string) => (event: React.MouseEvent<HTMLElement>) => {
// 			handleClickPrintingContextMenu(idx, name);
// 			setRenderPrintingValue(prev =>
// 				prev.map(e => (e.translatedKey === name ? { ...e, isVisible: !e.isVisible } : e))
// 			);
// 		};
// 	const handleOnKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => () => e.stopPropagation();

// 	return (
// 		<Menu
// 			open={Boolean(coordinates)}
// 			onClose={handleClose}
// 			anchorReference='anchorPosition'
// 			anchorPosition={
// 				coordinates ? { top: coordinates.mouseY, left: coordinates.mouseX } : undefined
// 			}
// 			PaperProps={{ sx: { display: 'flex', height: 310, width: 240, ...hideScrollbar() } }}
// 			MenuListProps={{
// 				sx: { display: 'flex', flexDirection: 'column', flexGrow: 1 },
// 			}}
// 		>
// 			<MenuItem dense>
// 				<TextField
// 					fullWidth
// 					placeholder='Значение фильтра'
// 					onChange={handleSearch}
// 					size='small'
// 					value={fieldValue}
// 					onKeyDown={handleOnKeyDown}
// 				/>
// 			</MenuItem>

// 			{renderPrintingValue.length ? (
// 				renderPrintingValue.map(e => (
// 					<MenuItem
// 						key={e.translatedKey}
// 						onClick={onClickMenuContext(activeTag.id, e.translatedKey)}
// 						dense
// 					>
// 						<Switch
// 							edge='start'
// 							size='small'
// 							checked={e.isVisible}
// 							tabIndex={-1}
// 							disableRipple
// 							inputProps={{
// 								'aria-labelledby': 'switch-list-label-wifi',
// 							}}
// 						/>
// 						<ListItemText id={e.translatedKey} primary={e.translatedKey} />
// 					</MenuItem>
// 				))
// 			) : (
// 				<Box
// 					display='flex'
// 					flexDirection='column'
// 					alignItems='center'
// 					justifyContent='center'
// 					flexGrow={1}
// 				>
// 					<SearchOffIcon /> <Typography component='span'>Значение не найдено</Typography>
// 				</Box>
// 			)}
// 		</Menu>
// 	);
// }

// export default TagContextMenu;
