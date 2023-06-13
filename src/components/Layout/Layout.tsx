
import Box from '@mui/material/Box';
import { Suspense, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import LayoutFooter from './LayoutFooter';
import LayoutHeader from './LayoutHeader';

import Fallback from 'components/Fallback';
import ReviewDialog from 'components/Forms/CreateReview/ReviewDialog';
import { AppRoutes } from 'constant/appRoutes';

function Layout(): JSX.Element {
	const [isOpenedReviewModal, setOpenedReviewModal] = useState(false);

	const handleModalReview = () => {
		setOpenedReviewModal(false);
	};

	const { pathname } = useLocation();

	return (
		<Box minHeight='100vh' height='100vh' display='flex' flexDirection='column'>
			{pathname !== AppRoutes.AUTH && <LayoutHeader setOpenModal={setOpenedReviewModal} />}
			<ReviewDialog isOpen={isOpenedReviewModal} handleModalReview={handleModalReview} />
			<Suspense fallback={<Fallback />}>
				<Outlet />
			</Suspense>
			<LayoutFooter />
		</Box>
	);
}

export default Layout;
