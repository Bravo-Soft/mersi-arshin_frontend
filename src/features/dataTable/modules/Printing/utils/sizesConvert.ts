import type { IPrintingLabel } from 'components/Forms/PrintSettings/constants/printingLabels';
import type { IPrintSettings } from 'types/printSettings';

export type TagSizesType = Record<keyof IPrintingLabel, number>;

export const filterSize = (data: IPrintSettings, size: string): TagSizesType => {
	const findSize = Object.values(data).find(e => e.title.toLowerCase() === size);
	return {
		font: findSize.font * 1.333,
		height: findSize.height * 3.79,
		width: findSize.width * 3.79,
	};
};
