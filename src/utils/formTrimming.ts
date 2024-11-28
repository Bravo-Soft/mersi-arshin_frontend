const setNames = new Set([
	'verificationDate',
	'productionDate',
	'dateOfTheNextVerification',
	'dateOfCommissioning',
	'fieldsDate',
]);

export const formTrimming = <T>(obj: T): T => {
	return typeof obj === 'object' && obj !== null && !Array.isArray(obj)
		? (Object.fromEntries(
				Object.entries(obj).map(([key, value]) => {
					if (setNames.has(key)) {
						return [key, value];
					}

					if (Array.isArray(value)) {
						const formatValue = value.map(e => formTrimming(e));
						return [key, formatValue];
					}

					if (typeof value === 'object' && value !== null) {
						return [key, formTrimming(value)];
					}

					if (typeof value === 'string') {
						return [key, value.trim()];
					}

					return [key, value];
				})
		  ) as T)
		: obj;
};
