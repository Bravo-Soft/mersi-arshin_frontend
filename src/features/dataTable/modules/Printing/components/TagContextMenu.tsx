import { theme } from 'theme';
import { useState } from 'react';
import { hideScrollbar } from 'utils/hideScrollbar';
import { customCheckbox } from 'styled/customCheckbox';

import type { ISortedTagItems } from '../utils/printingSort';
import type { ICoordinates } from 'features/dataTable/hooks/useContextMenuActions';

import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import SearchOffIcon from '@mui/icons-material/SearchOff';
import Typography from '@mui/material/Typography';

interface ITagContextMenuProps {
	activeTag: ISortedTagItems;
	coordinates: ICoordinates | null;
	handleClose: () => void;
	handleClickPrintingContextMenu: (idx: number, name: string) => void;
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
		(idx: number, name: string) => (event: React.MouseEvent<HTMLElement>) => {
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
				sx: { display: 'flex', flexDirection: 'column', flexGrow: 1 },
			}}
		>
			<Box px={1.5}>
				<TextField
					fullWidth
					placeholder='Значение фильтра'
					onChange={handleSearch}
					size='small'
					value={fieldValue}
					onKeyDown={handleOnKeyDown}
				/>
			</Box>
			{renderPrintingValue.length ? (
				renderPrintingValue.map(e => (
					<MenuItem
						key={`${e.translatedKey}_${e.isVisible}`}
						dense
						onClick={onClickMenuContext(activeTag.id, e.translatedKey)}
					>
						<ListItemIcon sx={customCheckbox(theme, theme.palette.primary.main)}>
							<Checkbox
								edge='start'
								checked={e.isVisible}
								tabIndex={-1}
								disableRipple
								inputProps={{ 'aria-labelledby': e.translatedKey }}
							/>
						</ListItemIcon>
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
