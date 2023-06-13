/**
 * `GetKeys` тип для извлечения набора ключей, более усовершенствованный аналог `keyof`
 * @template SourceType тип - источник ключей
 * @template KeepType критерий фильтрации
 * @template Include  признак для указания как интерпретировать критерий фильтрации. В случае false - инвертировать результат для KeepType
 */
export type GetKeys<SourceType, KeepType = unknown, Include = true> = {
	[K in keyof SourceType]: SourceType[K] extends KeepType
		? Include extends true
			? K
			: never
		: Include extends true
		? never
		: K;
}[keyof SourceType];
