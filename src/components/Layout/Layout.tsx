import Box from '@mui/material/Box';
import LayoutFooter from './LayoutFooter';
import LayoutHeader from './LayoutHeader';
import ReviewDialog from 'components/Forms/CreateReview/ReviewDialog';

import { useState } from 'react';
import { Outlet } from 'react-router-dom';

function Layout(): JSX.Element {
	const [isOpenedReviewModal, setOpenedReviewModal] = useState(false);

	const handleModalReview = () => {
		setOpenedReviewModal(false);
	};

	return (
		<Box minHeight='100vh' height='100vh' display='flex' flexDirection='column'>
			<LayoutHeader setOpenModal={setOpenedReviewModal} />
			<ReviewDialog isOpen={isOpenedReviewModal} handleModalReview={handleModalReview} />
			<Outlet />
			<LayoutFooter />
		</Box>
	);
}

export default Layout;
