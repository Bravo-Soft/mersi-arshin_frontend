import { AppRoutes } from 'constant/appRoutes';
import { useAppSelector } from 'hooks/redux';
import { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';

import { PrintingToolbar, PrintWrapper, TagList } from 'features/dataTable/modules/Printing';
import { selectSidebarStateOfPrintPage } from 'features/sidebar/sidebarSlice';
import { useSidebarElements } from 'features/sidebar/useSidebarElements';
import { useGetUserPrintSettingsQuery } from 'features/user/userApiSlice';
import { useTags } from 'features/dataTable/modules/Printing/hooks/useTags';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import LinkBehavior from 'components/LinkBehavior';
import Loader from 'components/Loader';
import Sidebar from 'features/sidebar/components/Sidebar';
import PageBox from 'styled/PageBox';

function PrintPage(): JSX.Element {
	useGetUserPrintSettingsQuery();
	const { open, selector } = useAppSelector(selectSidebarStateOfPrintPage);
	const sidebarElements = useSidebarElements('print');
	const { isFetching, isError, tags } = useTags();

	const labelListRef = useRef<HTMLDivElement>(null);

	const handlePrint = useReactToPrint({
		content: () => labelListRef.current,
	});

	return (
		<PageBox position='relative'>
			<PrintWrapper sidebarIsOpen={open}>
				<PrintingToolbar onPrint={handlePrint} />
				{isFetching && (
					<Box height={1} width={1} display='flex' alignItems='center' justifyContent='center'>
						<Loader text='Загружаем бирки...' />
					</Box>
				)}
				{tags && <TagList ref={labelListRef} tags={tags} />}
				{isError && (
					<Box
						height='auto'
						flexGrow={1}
						display='flex'
						alignItems='center'
						justifyContent='center'
					>
						<Typography
							variant='body2'
							sx={{
								maxWidth: '60%',
								color: 'text.secondary',
								textAlign: 'center',
								pb: 2,
							}}
						>
							Не удалось загрузить ни одной бирки. Перейдите на{' '}
							<LinkBehavior href={AppRoutes.HOME} replace>
								главную страницу
							</LinkBehavior>{' '}
							и повторите попытку.
						</Typography>
					</Box>
				)}
			</PrintWrapper>
			<Sidebar open={open} currentSelector={selector} sidebarElements={sidebarElements} />
		</PageBox>
	);
}

export default PrintPage;
