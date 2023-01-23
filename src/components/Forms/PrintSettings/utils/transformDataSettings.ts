import type { ISendData } from 'types/printSettings';

export const transformDataSettings = (sendData: ISendData) => ({
	params: {
		small: {
			title: 'Маленький',
			font: sendData['small-font'],
			width: sendData['small-width'],
			height: sendData['small-height'],
		},
		medium: {
			title: 'Средний',
			font: sendData['medium-font'],
			width: sendData['medium-width'],
			height: sendData['medium-height'],
		},
		large: {
			title: 'Большой',
			font: sendData['large-font'],
			width: sendData['large-width'],
			height: sendData['large-height'],
		},
	},
});
