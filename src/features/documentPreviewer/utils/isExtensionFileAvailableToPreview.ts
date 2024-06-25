export const isFileExtensionAvailableToPreview = (ext: string): boolean => {
	const extensions = ['txt', 'pdf', 'docx', 'doc', 'png', 'jpg', 'jpeg'];

	return extensions.includes(ext);
};