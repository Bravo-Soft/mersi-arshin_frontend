import { Package } from 'constant/package';

export interface IGroup {
	groupPackageName: Package;
	maxRowsPerTable: number;
	maxNumberUserTemplates: number;
	maxNumberUsersAccountGroup: number;
	isGroupAdministration: boolean;
	isPrintLabel: boolean;
	isReceiveNotifications: boolean;
	isFileStorage: boolean;
	maxSizePerRow: number;
	hasArhinIntegration: boolean;
}
