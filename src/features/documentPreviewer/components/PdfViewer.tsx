interface IPDFViewer {
	url: string;
}

export const PdfViewer = ({ url }: IPDFViewer) => {
	return (
		<iframe
			style={{ height: '100%', width: '100%', borderRadius: '0 0 8px 8px' }}
			src={url}
		></iframe>
	);
};
