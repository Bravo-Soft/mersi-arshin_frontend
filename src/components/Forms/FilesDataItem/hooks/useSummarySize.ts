import { useMemo } from 'react';

import type { IDocument } from 'types/dataItem';

/**
 *
 * @param arrayItems массив уже имеющихся файлов либо готовых к предзагрузке
 * @returns общий размер всех файлов позиции вместе
 */
export const useSummarySize = (arrayItems: IDocument[] | File[]) =>
	useMemo(
		() =>
			arrayItems
				.map(({ size }) => size)
				.reduce((totalSize, itemSize) => totalSize + itemSize, 0),
		[arrayItems]
	);
