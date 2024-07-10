import { GridFooter, GridFooterContainer } from '@mui/x-data-grid-pro';

export function CustomFooter() {
	return (
		<GridFooterContainer>
			<GridFooter
				sx={{
					height: '100%',
					borderRadius: '0 0 8px 8px',
				}}
			/>
		</GridFooterContainer>
	);
}
