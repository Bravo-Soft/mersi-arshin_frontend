import Tooltip from '@mui/material/Tooltip';
import { useRef } from 'react';

import type { ISortedTagItems } from '../utils/printingSort';
import { filterSize } from '../utils/sizesConvert';

import PrintingTagParams from './PrintingTagParams';

import { useGetUserPrintSettingsQuery } from 'features/user/userApiSlice';
import StyledPrintingTag from 'styled/StyledPrintingTag';
import type { IPrintSettings } from 'types/printSettings';

interface IPrintingTagProps {
	tag: ISortedTagItems;
	onOpenClick: (id: string) => (event: React.MouseEvent<HTMLElement>) => void;
}
const defaultValue: IPrintSettings = {} as IPrintSettings;

function Tag({ tag, onOpenClick }: IPrintingTagProps) {
	const { printSettigns, isFetchSizesPrinting } = useGetUserPrintSettingsQuery(undefined, {
		selectFromResult: ({ data, isFetching }) => ({
			printSettigns: data ?? defaultValue,
			isFetchSizesPrinting: isFetching,
		}),
	});
	const ref = useRef<HTMLElement | null>(null);

	return (
		<>
			{!isFetchSizesPrinting && (
				<Tooltip title='Правая кнопка мыши - открыть контекстное меню' ref={ref}>
					<StyledPrintingTag
						sizes={filterSize(printSettigns, tag.size)}
						onContextMenu={onOpenClick(tag.id)}
						id='demo-positioned-menu'
						sx={tag.size === 'маленький' ? {padding: '2px 4px 2px 0px'} : {}}
					>
						{tag &&
							tag.tagsPrint.map(({ isVisible, value, translatedKey }, index) => (
								<PrintingTagParams
									key={value + ' ' + index}
									isVisible={isVisible}
									value={value}
									translatedKey={translatedKey}
								/>
							))}
					</StyledPrintingTag>
				</Tooltip>
			)}
		</>
	);
}

export default Tag;
