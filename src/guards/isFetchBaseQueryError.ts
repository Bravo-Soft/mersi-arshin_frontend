import type { SerializedError } from '@reduxjs/toolkit';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';

export const isFetchBaseQueryError = (
	error?: FetchBaseQueryError | SerializedError
): error is FetchBaseQueryError => {
	if (error) {
		return 'status' in error;
	}
	return false;
};
