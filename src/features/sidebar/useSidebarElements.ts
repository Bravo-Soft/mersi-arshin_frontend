import type { ISidebarElement } from './components/Sidebar';
import type { SidebarPages, SidebarSelectors } from './sidebarSlice';

import CreateDataItem from 'components/Forms/CreateDataItem';
import EditDataItem from 'components/Forms/EditDataItem';
import FilesDataItem from 'components/Forms/FilesDataItem';
import NotificationSettings from 'components/Forms/NotificationSettings';
import PrintSettings from 'components/Forms/PrintSettings';
import VerificateDataItem from 'components/Forms/VerificateDataItem';
import { SidebarTitles } from 'constant/sidebarTitles';
import EditArshinStepper from 'features/dataTable/modules/Arshin/components/ArshinStepperForm/EditArshinStepper';
import EditSidebarArshinItem from 'features/dataTable/modules/Arshin/components/EditSidebarArshinItem';
import RequestsList from 'features/dataTable/modules/Arshin/components/RequestsList/RequestsList';
import UserProfile from 'features/user/UserProfile';
import { selectUserPermissions, selectUserRoles } from 'features/user/userSlice';
import { useAppSelector } from 'hooks/redux';

/**
 *	Простой хук, который возвращает разные массивы элементов сайдбара, в зависимости от страницы на которой
 * находится пользователь
 *
 * @param page текущая страница, они же ключи состояния сайдбара [см.здесь](./sidebarSlice.ts)
 * @returns массив элементов сайдбара, которые привязаны каждый к своему селектору [см.здесь](./components/Sidebar.tsx)
 */
export const useSidebarElements = (page: SidebarPages): ISidebarElement<SidebarSelectors>[] => {
	const { isReader } = useAppSelector(selectUserRoles);
	const { isFileStorage, isPrintLabel, isReceiveNotifications } =
		useAppSelector(selectUserPermissions);

	switch (page) {
		case 'home': {
			const sidebarElements: ISidebarElement<SidebarSelectors>[] = [
				{
					Component: CreateDataItem,
					selector: 'CreateDataItem',
					headerTitle: SidebarTitles.ADD_ITEM,
				},
				{
					Component: EditDataItem,
					selector: 'EditDataItem',
					headerTitle: isReader ? SidebarTitles.ITEM_INFORMATION : SidebarTitles.EDIT_ITEM,
				},
				{
					Component: VerificateDataItem,
					selector: 'VerificateDataItem',
					headerTitle: SidebarTitles.VERIFICATION_ITEM,
				},
				{
					Component: UserProfile,
					selector: 'UserProfile',
					headerTitle: SidebarTitles.PROFILE_SETTINGS,
				},
			];
			if (isReceiveNotifications) {
				sidebarElements.push({
					Component: NotificationSettings,
					selector: 'NotificationSettings',
					headerTitle: SidebarTitles.NOTIFICATION_SETTINGS,
				});
			}
			if (isFileStorage) {
				sidebarElements.push({
					Component: FilesDataItem,
					selector: 'FilesDataItem',
					headerTitle: SidebarTitles.ITEM_FILES,
				});
			}
			if (isPrintLabel) {
				sidebarElements.push({
					Component: PrintSettings,
					selector: 'PrintSettings',
					headerTitle: SidebarTitles.PRINT_SETTINGS,
				});
			}

			return sidebarElements;
		}

		case 'print': {
			const sidebarElements: ISidebarElement<SidebarSelectors>[] = [
				{
					Component: UserProfile,
					selector: 'UserProfile',
					headerTitle: SidebarTitles.PROFILE_SETTINGS,
				},
			];

			return sidebarElements;
		}
		case 'arshin': {
			const sidebarElements: ISidebarElement<SidebarSelectors>[] = [
				{
					Component: EditArshinStepper,
					selector: 'EditArshinItem',
					headerTitle: SidebarTitles.EDIT_ITEM,
				},
				{
					Component: EditSidebarArshinItem,
					selector: 'EditSidebarArshinItem',
					headerTitle: SidebarTitles.EDIT_ITEM,
				},
				{
					Component: UserProfile,
					selector: 'UserProfile',
					headerTitle: SidebarTitles.PROFILE_SETTINGS,
				},
				{
					Component: RequestsList,
					selector: 'RequestsList',
					headerTitle: SidebarTitles.REQUESTS_LIST,
				},
			];

			return sidebarElements;
		}
		case 'history': {
			const sidebarElements: ISidebarElement<SidebarSelectors>[] = [
				{
					Component: UserProfile,
					selector: 'UserProfile',
					headerTitle: SidebarTitles.PROFILE_SETTINGS,
				},
			];

			return sidebarElements;
		}
		default:
			return [];
	}
};
