import JSZip from 'jszip';

interface IEmptyDocx {
	isEmpty: boolean;
	isCorrupt: boolean;
}

export const isDocxEmpty = async (blob: Blob): Promise<IEmptyDocx> => {
	try {
		const arrayBuffer = await blob.arrayBuffer();
		const zip = await JSZip.loadAsync(arrayBuffer);
		const docXml = await zip.file('word/document.xml')?.async('text');
		if (!docXml) {
			return { isEmpty: false, isCorrupt: true };
		} else {
			const parser = new DOMParser();
			const xmlDoc = parser.parseFromString(docXml, 'application/xml');
			const textContent = xmlDoc.documentElement.textContent || '';

			if (textContent.trim().length === 0) {
				return { isEmpty: true, isCorrupt: false };
			}
			return { isEmpty: false, isCorrupt: false };
		}
	} catch (error) {
		return { isEmpty: false, isCorrupt: true };
	}
};
