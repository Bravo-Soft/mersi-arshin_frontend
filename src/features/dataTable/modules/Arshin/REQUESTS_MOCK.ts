import { IRequestItem } from 'types/arshinIntegration';

export const REQUESTS_MOCK: IRequestItem[] = [
	{
		author: 'Барабек Курдюмов',
		requestId: '9iufsabskjsdf2234',
		status: 'В процессе',
		requestTitle: 'Запрос от 06.11.2024',
		fieldsDate: ['2024-11-05T21:00:00.000Z', '2024-11-29T21:00:00.000Z'],
		periodicity: 3,
		items: [
			'18e1af45-a76d-4bc2-8258-bfa29be8071f',
			'04e16f3f-8c2e-4f51-bffd-6d5afb9546b3',
			'5f856a33-7c06-4a22-ae33-3f8f3a5146b0',
		],
	},
	{
		author: 'Македонский Александр',
		requestId: '9iufsabs2kjsdf2234',
		status: 'Отменен',
		requestTitle: 'Запрос от 06.11.2024',
		fieldsDate: ['2024-11-05T21:00:00.000Z', '2024-11-29T21:00:00.000Z'],
		periodicity: 3,
		items: [
			'27132d7e-d2d9-4eb0-8339-8e2c584061f5',
			'5bbb4d9d-fbe6-4b81-965c-a34dca34f242',
			'8c04196c-8828-4f0b-a599-409de2ae2299',
			'b32535ae-6b09-4428-9431-ff1e443fab0c',
		],
	},
	{
		author: 'Холмогоров Космос Юрьевич',
		requestId: '9iufsabskjsfdf2234',
		status: 'Готово',
		requestTitle: 'Запрос от 06.11.2024',
		fieldsDate: ['2024-11-05T21:00:00.000Z', '2024-11-29T21:00:00.000Z'],
		periodicity: 3,
		items: ['8c04196c-8828-4f0b-a599-409de2ae2299', 'd9161072-d0a9-4723-a3a8-0da151ae7392'],
	},
];
