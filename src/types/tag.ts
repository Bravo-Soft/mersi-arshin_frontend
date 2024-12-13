import type { IDataItem } from './dataItem';

import type { Tag } from 'constant/tag';

export type DataItemKeys = keyof Omit<
	IDataItem,
	'id' | 'size' | 'suitability' | 'notes' | 'fgisUrl' | 'verificationControlInStateRegister'
>;

export interface ITagParameters {
	translatedKey: string;
	isVisible: boolean;
	value: string;
}

export interface ITag extends Record<DataItemKeys, ITagParameters> {
	id: string;
	size: Tag;
}
