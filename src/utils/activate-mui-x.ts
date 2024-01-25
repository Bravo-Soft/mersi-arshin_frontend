import { LicenseInfo } from '@mui/x-license-pro';

import { LICENSE_KEY } from '../constant/licenseKey';

export const activateMuiX = () => {
	if (!LICENSE_KEY) {
		throw new Error("Licence key of MUI-X not be initialized!");
	}
	LicenseInfo.setLicenseKey(LICENSE_KEY);
}
