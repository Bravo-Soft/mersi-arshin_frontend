import { filterSize } from '../utils/sizesConvert';
import { useGetUserPrintSettingsQuery } from 'features/user/userApiSlice';

import type { ISortedTagItems } from '../utils/printingSort';
import type { IPrintSettings } from 'types/printSettings';

import StyledPrintingTag from 'styled/StyledPrintingTag';
import PrintingTagParams from './PrintingTagParams';
import { useRef } from 'react';
import { Tooltip } from '@mui/material';

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
				<Tooltip title='Правая кнопка мыши - октрыть контекстное меню' ref={ref}>
					<StyledPrintingTag
						sizes={filterSize(printSettigns, tag.size)}
						onContextMenu={onOpenClick(tag.id)}
						id='demo-positioned-menu'
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
