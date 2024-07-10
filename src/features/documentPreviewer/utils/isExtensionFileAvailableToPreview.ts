export const isFileExtensionAvailableToPreview = (ext: string): boolean => {
	const extensions = ['docx', 'pdf', 'png', 'jpg', 'jpeg', 'txt', 'xls', 'xlsx'];

	return extensions.includes(ext?.toLowerCase());
};
