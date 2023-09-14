const MAX_EMAIL_COUNT = 3;

enum DATE_OF_SENDING_NOTIFICATION {
	ONE_WEEK = 1,
	TWO_WEEKS = 2,
}

enum RANGE_OF_SELECTION {
	MONTH = 1,
	QUARTER = 2,
	HALF_A_YEAR = 3,
}

export { DATE_OF_SENDING_NOTIFICATION, RANGE_OF_SELECTION, MAX_EMAIL_COUNT };
