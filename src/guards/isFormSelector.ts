import type { SidebarSelectors } from 'features/sidebar/sidebarSlice';

type FormSelectorKeys = Extract<
	SidebarSelectors,
	'EditDataItem' | 'VerificateDataItem' | 'FilesDataItem' | 'UserProfile'
>;

export const isFormSelector = (selector?: SidebarSelectors): selector is FormSelectorKeys =>
	selector === 'EditDataItem' ||
	selector === 'VerificateDataItem' ||
	selector === 'FilesDataItem' ||
	selector === 'UserProfile';
