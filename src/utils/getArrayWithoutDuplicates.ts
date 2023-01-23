/**
 * ВАЖНО! Метод работает исключительно с примитивами
 * @param args массив аргументов, строго одного типа
 * @returns массив избавленный от дубликатов
 */
export const getArrayWithoutDuplicates = <T extends string | number | boolean>(...args: T[]) =>
	Array.from(new Set(args));
