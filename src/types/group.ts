import { Package } from 'constant/package';

export interface IGroup {
	groupPackageName: Package;
	maxRowsPerTable: number;
	maxNumberUserTemplates: number;
	maxNumberUsersAccountGroup: number;
	groupModules: {
		isGroupAdministration: boolean;
		isPrintLabel: boolean;
		isReceiveNotifications: boolean;
		isFileStorage: {
			enable: boolean;
			maxSizePerRow: number;
		};
		hasArhinIntegration: boolean;
	};
}
