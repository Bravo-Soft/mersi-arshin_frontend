export const getPrintValue = (value: string | boolean | number) => {
	let renderValue: string | boolean | number = '-';

	switch (typeof value) {
		case 'boolean':
			renderValue = value ? 'Да' : 'Нет';
			break;
		case 'string':
			renderValue = value ? value : '-';
			break;
		default:
			renderValue = value;
			break;
	}
	return renderValue;
};
