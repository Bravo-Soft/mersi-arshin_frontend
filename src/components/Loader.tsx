import Box from '@mui/material/Box';
import type { CircularProgressProps } from '@mui/material/CircularProgress';
import { circularProgressClasses } from '@mui/material/CircularProgress';
import CircularProgress from '@mui/material/CircularProgress';
import { alpha } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

interface ILoaderProps extends Pick<CircularProgressProps, 'size' | 'thickness'> {
	text?: string;
}

function Loader(props: ILoaderProps): JSX.Element {
	const { size = 60, thickness = 5, text = 'Загрузка...' } = props;
	return (
		<Box display='flex' flexDirection='column' alignItems='center' rowGap={1}>
			<Box sx={{ position: 'relative' }}>
				<CircularProgress
					variant='determinate'
					sx={{
						color: 'grey.300',
					}}
					size={size}
					thickness={thickness}
					value={100}
				/>
				<CircularProgress
					variant='indeterminate'
					disableShrink
					sx={{
						color: theme => alpha(theme.palette.primary.main, 0.5),
						animationDuration: '2000ms',
						position: 'absolute',
						left: 0,
						[`& .${circularProgressClasses.circle}`]: {
							strokeLinecap: 'round',
						},
					}}
					size={size}
					thickness={thickness}
				/>
			</Box>
			<Typography color='text.secondary' variant='body2' component='span' children={text} />
		</Box>
	);
}

export default Loader;
