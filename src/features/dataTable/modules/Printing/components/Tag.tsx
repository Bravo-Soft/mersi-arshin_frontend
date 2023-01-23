import { filterSize } from '../utils/sizesConvert';
import { useGetUserPrintSettingsQuery } from 'features/user/userApiSlice';

import type { IPrintSettings } from 'types/printSettings';
import type { ISortedTagItems } from '../utils/printingSort';

import StyledPrintingTag from 'styled/StyledPrintingTag';
import PrintingTagParams from './PrintingTagParams';

interface IPrintingTagProps {
	tag: ISortedTagItems;
	onOpenClick: (id: number) => (event: React.MouseEvent<HTMLElement>) => void;
}
const defaultValue: IPrintSettings = {} as IPrintSettings;

function Tag({ tag, onOpenClick }: IPrintingTagProps) {
	const { printSettigns, isFetchSizesPrinting } = useGetUserPrintSettingsQuery(undefined, {
		selectFromResult: ({ data, isFetching }) => ({
			printSettigns: data ?? defaultValue,
			isFetchSizesPrinting: isFetching,
		}),
	});

	return (
		<>
			{!isFetchSizesPrinting && (
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
			)}
		</>
	);
}

export default Tag;
