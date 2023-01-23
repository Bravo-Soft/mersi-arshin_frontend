export interface ITemplateСonfig {
	/**
	 * Идентификационный номер
	 */
	id: number;
	/**
	 * Наименование шаблона
	 */
	templateName: string;
	/**
	 * Объект шаблона преобразованный в строку
	 */
	template: string;
	/**
	 * Булевый флаг, обозначающий, выбран ли данный шаблон
	 */
	isTemplateSelected: boolean;
}
