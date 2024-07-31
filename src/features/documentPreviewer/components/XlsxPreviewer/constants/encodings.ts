import type { SelectableValues } from '../types/selectableValues';

export const encodings: SelectableValues = {
	utf8: {
		name: '65001: Юникод (UTF-8)',
		value: 'utf-8',
	},
	windows: {
		name: '1251: Кириллическая (Windows)',
		value: 'windows-1251',
	},
	mac: {
		name: '10007: Кириллическая (Mac)',
		value: 'x-mac-cyrillic',
	},
	dos: { name: '866: Кириллическая (DOS)', value: 'ibm866' },
};

export const defaultEncoding = encodings.utf8.value;
