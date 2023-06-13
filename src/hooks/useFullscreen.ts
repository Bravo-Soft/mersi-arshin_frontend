import { enqueueSnackbar } from 'notistack';

import { Messages } from 'constant/messages';

type UseFullscreenHookReturned = [boolean, () => void];

/**
 * Хук возвращает кортеж из булевого значения, активирован ли `fullscreen` мод или нет, и функции переключающая его
 */
export const useFullscreen = (): UseFullscreenHookReturned => {
	const hasElementsInFullscreen = Boolean(document.fullscreenElement);

	const handleToggleFullscreenMode = async () => {
		if (!hasElementsInFullscreen) {
			try {
				await document.documentElement.requestFullscreen();
			} catch {
				enqueueSnackbar(Messages.YOUR_BROWSER_DONT_SUPPLY_THIS_FUNCTION, {
					variant: 'warning',
				});
			}
		} else {
			if (document.fullscreenEnabled) {
				await document.exitFullscreen();
			}
		}
	};

	return [hasElementsInFullscreen, handleToggleFullscreenMode];
};
