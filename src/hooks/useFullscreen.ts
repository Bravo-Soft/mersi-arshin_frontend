import { useAppDispatch } from './redux';
import useNotification from './useNotification';

type UseFullscreenHookReturned = [boolean, () => void];

/**
 * Хук возвращает кортеж из булевого значения, активирован ли `fullscreen` мод или нет, и функция переключающая его
 */
export const useFullscreen = (): UseFullscreenHookReturned => {
	const hasElementsInFullscreen = Boolean(document.fullscreenElement);
	const dispatch = useAppDispatch();
	const showNotification = useNotification(dispatch);

	const handleToggleFullscreenMode = async () => {
		if (!hasElementsInFullscreen) {
			try {
				await document.documentElement.requestFullscreen();
			} catch {
				showNotification('YOUR_BROWSER_DONT_SUPPLY_THIS_FUNCTION', 'warning');
			}
		} else {
			if (document.fullscreenEnabled) {
				await document.exitFullscreen();
			}
		}
	};

	return [hasElementsInFullscreen, handleToggleFullscreenMode];
};
