import type { GridApiPro } from '@mui/x-data-grid-pro/models/gridApiPro';

import { useEffect } from 'react';
import { parseTemplate } from 'utils/templateUtils';
import { useGetSelectedTemplateQuery } from '../modules/Templates/templatesApiSlice';

/**
 * Хук восстанавливает выбранный шаблон, который берется с сервера через запрос
 * @param apiRef ref-ссылка таблицы
 */
export const useApplySelectedTemplate = (apiRef: React.MutableRefObject<GridApiPro>) => {
	const { data, isSuccess } = useGetSelectedTemplateQuery();

	useEffect(() => {
		/* Если по эндпоинту с текущим выбранным шаблоном есть данные и isSuccess true
			тогда мы парсим ответ и восстанавливаем сохраненное состояние */
		if (isSuccess) {
			apiRef.current.restoreState(parseTemplate(data.template));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data]);
};
