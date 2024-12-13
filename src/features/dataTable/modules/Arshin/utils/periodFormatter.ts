export const periodFormatter = (period: number) => {
	switch (period) {
		case 1:
			return `1 раз в сутки`;
		case 2:
			return `1 раз в 4 часа`;
		case 3:
			return `1 раз в 6 часов`;
	}
};
