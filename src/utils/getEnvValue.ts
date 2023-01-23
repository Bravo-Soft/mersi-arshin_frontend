export const getEnvValue = (key: string) => {
	const value = process.env['REACT_APP_' + key];
	if (!value) throw new Error('Не найдено значение ключа переменной окружения');
	return value;
};
