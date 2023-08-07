import type { SvgIconProps } from '@mui/material/SvgIcon';
import SvgIcon from '@mui/material/SvgIcon';

export function ArshinIcon(props: SvgIconProps): JSX.Element {
	return (
		<SvgIcon {...props} viewBox='0 0 24 24'>
			<path d='M4.17389 11.4783H7.30432V24H4.17389V11.4783Z' />
			<path d='M16.6956 11.4783H19.8261V24H16.6956V17.7391V11.4783Z' />
			<path d='M12.5217 11.4783H15.6521V24H12.5217V11.4783Z' />
			<path d='M8.3478 11.4783H11.4782L11.4782 24H8.3478L8.3478 11.4783Z' />
			<path fillRule='evenodd' clipRule='evenodd' d='M3.13043 0H0V24H3.13043V0Z' />
			<path fillRule='evenodd' clipRule='evenodd' d='M24 0H20.8696V24H24V0Z' />
		</SvgIcon>
	);
}
