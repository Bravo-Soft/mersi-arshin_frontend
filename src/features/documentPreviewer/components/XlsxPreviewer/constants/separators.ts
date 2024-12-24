import type { SelectableValues } from '../types/selectableValues';

export const separators: SelectableValues = {
	colon: { name: 'Двоеточие', value: ':' },
	comma: { name: 'Запятая', value: ',' },
	equal: { name: 'Знак равенства', value: '=' },
	semicolon: { name: 'Точка с запятой', value: ';' },
	space: { name: 'Пробел', value: ' ' },
	tabulation: { name: 'Табуляция', value: '\t' },
	custom: { name: '--Пользовательский--', value: 'custom' },
};

export const defaultSeparator = separators.semicolon.value;
