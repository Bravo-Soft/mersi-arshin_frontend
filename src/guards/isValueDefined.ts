export const isValueDefined = <T>(value: T | undefined | null): value is T =>
	typeof value !== 'undefined' && value !== null;
