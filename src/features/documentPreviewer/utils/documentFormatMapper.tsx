import { DocxViewer } from '../components/DocxPreviewer/DocxViewer';
import { ImagesViewer } from '../components/ImagesViewer';
import { PdfViewer } from '../components/PdfPreviewer/PdfViewer';
import { TxtViewer } from '../components/TxtViewer';
import { XlsxViewer } from '../components/XlsxPreviewer/XlsxPreviewer';

interface IFormatMapper {
	[key: string]: (url: string) => JSX.Element;
}

export const formatMapper: IFormatMapper = {
	txt: (url: string) => <TxtViewer url={url} />,
	pdf: (url: string) => <PdfViewer url={url} />,
	docx: (url: string) => <DocxViewer url={url} />,
	doc: (url: string) => <DocxViewer url={url} />,
	png: (url: string) => <ImagesViewer url={url} />,
	jpg: (url: string) => <ImagesViewer url={url} />,
	jpeg: (url: string) => <ImagesViewer url={url} />,
	xls: (url: string) => <XlsxViewer url={url} type='xls' />,
	xlsx: (url: string) => <XlsxViewer url={url} type='xlsx' />,
	csv: (url: string) => <XlsxViewer url={url} type='csv' />,
};
