import type { Tag } from 'constant/tag';
import type { IDataItem } from './dataItem';

export type DataItemKeys = keyof Omit<IDataItem, 'id' | 'size' | 'documents' | 'notes'>;

export interface ITagParameters {
	translatedKey: string;
	isVisible: boolean;
	value: string;
}

export interface ITag extends Record<DataItemKeys, ITagParameters> {
	id: string;
	size: Tag;
}
