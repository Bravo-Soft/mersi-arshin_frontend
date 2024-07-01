import { DocxViewer } from '../components/DocxViewer';
import { ImagesViewer } from '../components/ImagesViewer';
import { PdfViewer } from '../components/PdfViewer';
import { TxtViewer } from '../components/TxtViewer';

interface IFormatMapper {
	[key: string]: (url: string) => JSX.Element;
}

export const formatMapper: IFormatMapper = {
	txt: (url: string) => <TxtViewer url={url} />,
	pdf: (url: string) => <PdfViewer url={url} />,
	docx: (url: string) => <DocxViewer url={url} />,
	// doc: (url: string) => <DocxViewer url={url} />,
	png: (url: string) => <ImagesViewer url={url} />,
	jpg: (url: string) => <ImagesViewer url={url} />,
	jpeg: (url: string) => <ImagesViewer url={url} />,
};