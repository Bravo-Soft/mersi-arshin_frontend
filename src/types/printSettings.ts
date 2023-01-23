export interface IPrintSetting {
	width: number;
	height: number;
	font: number;
	title: string;
}

export interface IPrintSettings {
	small: IPrintSetting;
	medium: IPrintSetting;
	large: IPrintSetting;
}

export interface IPrintSettingResponse {
	params: IPrintSettings;
}

export interface ISendData {
	'large-font': number;
	'large-height': number;
	'large-width': number;
	'medium-font': number;
	'medium-height': number;
	'medium-width': number;
	'small-font': number;
	'small-height': number;
	'small-width': number;
}
