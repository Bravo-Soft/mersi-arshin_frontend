import type { IDataItem } from './dataItem';

import type { Tag } from 'constant/tag';

export type DataItemKeys = keyof Omit<
	IDataItem,
	'id' | 'size' | 'suitability' | 'documents' | 'notes'
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
