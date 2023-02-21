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
		const searchValue = event.target.value.toLowerCase().trim();
		const printingFilterParams = activeTag.tagsPrint.filter(e =>
			e.translatedKey.toLowerCase().trim().includes(searchValue)
		);
		setRenderPrintingValue(printingFilterParams);
		setFieldValue(event.target.value);
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => e.stopPropagation();

	const handleClickContextMenu =
		(idx: string, name: string) => (event: React.MouseEvent<HTMLElement>) => {
			handleClickPrintingContextMenu(idx, name);
			setRenderPrintingValue(prev =>
				prev.map(e => (e.translatedKey === name ? { ...e, isVisible: !e.isVisible } : e))
			);
		};

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
				sx: { display: 'flex', flexDirection: 'column', flexGrow: 1 },
			}}
		>
			<MenuItem dense>
				<TextField
					fullWidth
					placeholder='Значение фильтра'
					onChange={handleSearch}
					size='small'
					value={fieldValue}
					onKeyDown={handleKeyDown}
				/>
			</MenuItem>

			{renderPrintingValue.length ? (
				renderPrintingValue.map(e => (
					<MenuItem
						key={e.translatedKey}
						onClick={handleClickContextMenu(activeTag.id, e.translatedKey)}
						dense
					>
						<Switch
							edge='start'
							size='small'
							checked={e.isVisible}
							tabIndex={-1}
							disableRipple
							inputProps={{
								'aria-labelledby': 'switch-list-label-wifi',
							}}
						/>
						<ListItemText id={e.translatedKey} primary={e.translatedKey} />
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
