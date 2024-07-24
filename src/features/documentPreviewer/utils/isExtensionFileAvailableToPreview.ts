export const isFileExtensionAvailableToPreview = (ext: string): boolean => {
	const extensions = ['doc', 'docx', 'pdf', 'png', 'jpg', 'jpeg', 'txt', 'xls', 'xlsx'];

	return extensions.includes(ext?.toLowerCase());
};
