import * as pdfjsLib from 'pdfjs-dist';
import { useState, useEffect } from 'react';
import { read } from 'xlsx';

import { useUploadFile } from './useFileUpload';

import { isDocxEmpty } from 'features/documentPreviewer/components/DocxPreviewer/utils/isDocxEmpty';
import { isXlsEmpty } from 'features/documentPreviewer/components/XlsxPreviewer/utils/isXlsEmpty';

pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
	'pdfjs-dist/build/pdf.worker.min.mjs',
	import.meta.url
).toString();

export const useFileValidation = (url: string) => {
	const [fileStatus, setFileStatus] = useState<{
		isEmpty: boolean | null;
		isCorrupt: boolean | null;
	}>({ isEmpty: null, isCorrupt: null });
	const [text, setText] = useState<string>('');
	const { blob, arrayBuffer } = useUploadFile(url);

	useEffect(() => {
		const validateFile = async (): Promise<{ isEmpty: boolean; isCorrupt: boolean }> => {
			try {
				if (blob && blob.size === 0) {
					return { isEmpty: true, isCorrupt: false };
				}

				// Валидация pdf файлов
				if (blob && blob.type.endsWith('pdf')) {
					const loadingData = pdfjsLib.getDocument(url);
					const pdf = await loadingData.promise;

					if (pdf && pdf.numPages === 0) {
						return { isEmpty: true, isCorrupt: false };
					}
				}

				// Валидация docx файлов
				if (blob && blob.type.endsWith('wordprocessingml.document')) {
					const { isEmpty, isCorrupt } = await isDocxEmpty(blob);
					return { isEmpty, isCorrupt };
				}

				// Валидация excel файлов
				if (
					blob &&
					(blob.type.endsWith('spreadsheetml.sheet') || blob.type.endsWith('vnd.ms-excel'))
				) {
					try {
						const wb = read(arrayBuffer, { type: 'array' });
						if (isXlsEmpty(wb)) {
							return { isEmpty: true, isCorrupt: false };
						}
						return { isEmpty: false, isCorrupt: false };
					} catch (error) {
						return { isEmpty: false, isCorrupt: true };
					}
				}

				// Валидация txt файлов
				if (blob && blob.type.endsWith('text/plain')) {
					const checkForInvalidCharacters = (content: string): boolean => {
						const invalidCharacterPattern = /[\uFFFD\uDC80-\uDCFF]/;
						return invalidCharacterPattern.test(content);
					};
					try {
						await blob.text().then(text => setText(text));
						if (checkForInvalidCharacters(text)) {
							return { isEmpty: false, isCorrupt: true };
						}
						if (text.trim().length === 0) {
							return { isEmpty: true, isCorrupt: false };
						}
					} catch (error) {
						return { isEmpty: false, isCorrupt: true };
					}
				}

				return { isEmpty: false, isCorrupt: false };
			} catch (error) {
				return { isEmpty: false, isCorrupt: true };
			}
		};

		validateFile().then(status => {
			setFileStatus(status);
		});
	}, [url, blob, arrayBuffer, text]);

	return { fileStatus, blob, arrayBuffer, text };
};
