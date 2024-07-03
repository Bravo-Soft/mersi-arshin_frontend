export const isFileExtensionAvailableToPreview = (ext: string): boolean => {
	const extensions = ['docx', 'pdf', 'png', 'jpg', 'jpeg', 'txt'];

	return extensions.includes(ext?.toLowerCase());
};
