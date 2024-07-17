import JSZip from 'jszip';

import { AppDispatch } from 'app/store';
import { setPreviewerIsFailed } from 'features/documentPreviewer/documentPreviewerSlice';

export const isDocxEmpty = async (blob: Blob, dispatch: AppDispatch): Promise<boolean> => {
	if (blob.size === 0) {
		return true;
	}

	try {
		const arrayBuffer = await blob.arrayBuffer();
		const zip = await JSZip.loadAsync(arrayBuffer);
		const docXml = await zip.file('word/document.xml')?.async('text');

		if (!docXml) {
			dispatch(setPreviewerIsFailed(true));
		} else {
			const parser = new DOMParser();
			const xmlDoc = parser.parseFromString(docXml, 'application/xml');
			const textContent = xmlDoc.documentElement.textContent || '';

			return textContent.trim().length === 0;
		}
		return true;
	} catch (error) {
		dispatch(setPreviewerIsFailed(true));
		return true;
	}
};
