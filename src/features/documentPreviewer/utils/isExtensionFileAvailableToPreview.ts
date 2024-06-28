export const isFileExtensionAvailableToPreview = (ext: string): boolean => {
	const extensions = ['txt', 'pdf', 'docx', 'png', 'jpg', 'jpeg'];

	return extensions.includes(ext);
};