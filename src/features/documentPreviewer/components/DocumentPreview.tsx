import { createPortal } from 'react-dom';

import { useGetUrlForDocumentPreviewQuery } from '../documentPreviewApiSlice';
import { formatMapper } from '../utils/documentFormatMapper';
import { getFormatByFilename } from '../utils/getFormatByFilename';

import { DocumentPreviewHeader } from './DocumentPreviewHeader';
import { DocumentPreviewLayout } from './DocumentPreviewLayout';

import Loader from 'components/Loader';

interface IDocumentPreview {
	itemId: string | undefined;
	documentId: string;
	label: string;
	close: () => void;
}

const renderDocumentPreview = (format: string, url: string) => formatMapper[format](url);

export const DocumentPreview = ({ itemId, documentId, label, close }: IDocumentPreview) => {
	const { data: url, isLoading } = useGetUrlForDocumentPreviewQuery({ itemId, documentId });

	return (
		<>
			{createPortal(
				<DocumentPreviewLayout>
					{isLoading && <Loader />}
					{!isLoading && <DocumentPreviewHeader closePreviewLayout={close} filename={label} />}
					{url && renderDocumentPreview(getFormatByFilename(label), url)}
				</DocumentPreviewLayout>,
				document.body
			)}
		</>
	);
};
