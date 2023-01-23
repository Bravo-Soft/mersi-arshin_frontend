export enum Messages {
	// Диалоги
	MODULE_IS_NOT_PAID = 'Данный модуль не оплачен и не входит в ваш пакет, обратитесь в службу поддержки',
	MAX_COUNT_OF_TEMPLATES_IS_REACHED = 'Достигнуто максимальное кол-во шаблонов, для расширения пакета свяжитесь со службой поддержки',
	MAX_COUNT_OF_ITEMS_IS_REACHED = 'Достигнуто максимальное кол-во позиций, для расширения пакета свяжитесь со службой поддержки',
	DELETE_MESSAGE = 'Вы действительно хотите удалить СИ? Это действие невозможно отменить!',

	// Уведомления - Предупреждающие
	PHOTO_IS_NOT_SELECTED = 'Для сохранения, выберете новое фото',
	MAX_SIZE_OF_FILES_IS_REACHED = 'Достигнут максимальный размер файлов на позицию',
	ALL_COLUMNS_IS_HIDDEN = 'Скрыты все колонки, откройте хотя бы одну и повторите попытку',
	YOUR_BROWSER_DONT_SUPPLY_THIS_FUNCTION = 'Ваш браузер не поддерживает данную функцию',

	// Уведомления – Информационные
	TEMPLATE_SUCCESSFULLY_APPLIED = 'Применен выбранный шаблон',
	APPLIED_DEFAULT_TEMPLATE = 'Применен шаблон по умолчанию',
	DEFAULT_TEMPLATE_RESTORED = 'Шаблон по умолчанию восстановлен',
	DATA_ITEM_IS_UPDATED = 'Позиция обновлена',
	PRESS_BUTTON_FOR_SAVING = 'Для сохранения всех данных, нажмите на кнопку ниже',
	PHOTO_RESET = 'Фотография сброшена',
	FILES_SUCCESSFULLY_UPLOADED = 'Файл(ы) успешно загружен(ы)',
	DATA_COPY_TO_CLIPBOARD = 'Скопировано в буфер обмена',

	// Уведомления – Успешные
	WELCOME = 'Добро пожаловать',
	THE_TEMPLATE_WAS_CREATED_SUCCESSFULLY = 'Шаблон успешно создан',
	THE_TEMPLATE_WAS_SUCCESSFULLY_DELETED = 'Шаблон успешно удален',
	ITEM_SUCCESSFULY_CREATED = 'Новая позиция успешно добавлена',
	ITEM_SUCCESSFULY_DELETED = 'Позиция успешно удалена',
	PHOTO_SUCCESSFULY_UPDATED = 'Фотография обновлена',
	USER_PROFILE_SUCCESSFULY_UPDATED = 'Профиль успешно обновлен',
	FILE_SUCCESSFULY_DELETED = 'Файл успешно удален',
	NOTIFICATION_SUCCESSFULY_UPDATED = 'Уведомления успешно обновлены',
	SETTINGS_SUCCESSFULY_UPDATED = 'Настройки печати успешно обновлены',
	SETTINGS_SUCCESSFULY_RESETED = 'Применены стандартные настройки печати',
	REVIEW_SUCCESSFULY_SENDED = 'Отзыв успешно отправлен',

	//Уведомления – ошибочные
	FORBIDDEN = 'Нет доступа',
	AUTHORIZATION_ERROR = 'Ошибка авторизации, повторите вход',
	ERROR_CONNECTION = 'Соединение с сервером оборвано',
	ERROR_REPEAT = 'Произошла ошибка, повторите попытку',
	SOMETHING_WRONG_ELSE = 'Что-то пошло не так',
	FAILED_DELETE_ITEM = 'Не удалось удалить позицию',
	FAILED_TO_SAVE_ITEM = 'Не удалось сохранить позицию',
	FAILED_TO_SAVE_TEMPLATE = 'Не удалось сохранить шаблон',
	FAILED_TO_LOADING_TEMPLATE = 'Не удалось загрузить шаблон',
	FAILED_TO_UPDATE_DATA_ITEM = 'Не удалось обновить позицию',
	FAILED_TO_LOAD_PHOTO = 'Не удалось загрузить фотографию',
	FAILED_TO_RESET_PHOTO = 'Не удалось сбросить фото',
	FAILED_TO_UPDATE_PROFILE = 'Не удалось обновить профиль',
	FAILED_TO_UPDATE_NOTIFICATION = 'Не удалось обновить уведомления',
	ITEM_NOT_FOUND = 'Не удалось найти СИ, обновите страницу и повторите попытку',
	PERMISSIONS_ERROR = 'Недостаточно прав',
	INVALID_REQUEST_BODY = 'Неверный формат данных',
	FAILED_TO_UPLOAD_FILES = 'Не удалось загрузить файл(ы)',
	FAILED_TO_DELETING_FILE = 'Не удалось удалить файл',
	FILE_NOT_FOUND = 'Файл не найден',
	FAILED_TO_SAVE_WORKBOOK = 'Не удалось экспортировать таблицу',
	FAILED_ADDED_TO_FAVORITE = 'Не удалось добавить в избранное',
	FAILED_TO_DELETE_FROM_FAVORITE = 'Не удалось удалить из избранного',
	FAILED_COPY_DATA_TO_CLIPBOARD = 'Не удалось скопировать данные в буфер обмена',
	FAILED_TO_CHANGE_PRINTING_OPTIONS = 'Не удалось изменить настройки печати',
	FAILED_TO_FETCH_TAGS = 'Не удалось загрузить бирки',
	FAILED_TO_SEND_REVIEW = 'Не удалось отправить отзыв',
	AUTHORIZATION_TIMEOUT = 'Истекло время сессии, повторите вход',
	FILES_IS_LARGE = 'Слишком большой размер файлов',
	PHOTO_IS_LARGE = 'Размер фото превышает максимальный размер в 2мб',
	PHOTO_NOT_FOUND = 'Фото не найдено',
	FAILED_TO_LARGE_FILE_SIZE = 'Превышен лимит файлов',
	FAILED_TO_WRONG_FILE_TIPE = 'Неверный тип файлов',
}
