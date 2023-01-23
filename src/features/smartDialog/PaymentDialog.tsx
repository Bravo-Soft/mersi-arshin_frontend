import Button from '@mui/material/Button';
import Dialog from 'components/Dialog';

import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { changeSmartDialogState, selectPaymentVariant } from './smartDialogSlice';

function PaymentDialog(): JSX.Element {
	const dispatch = useAppDispatch();
	const { content, isOpen } = useAppSelector(selectPaymentVariant);

	const handleClosePaymentDialog = () => {
		dispatch(changeSmartDialogState({ variant: 'payment', isOpen: false }));
	};

	return (
		<Dialog
			title='Информация'
			content={content}
			open={isOpen}
			action={<Button onClick={handleClosePaymentDialog}>Закрыть</Button>}
			onClose={handleClosePaymentDialog}
		/>
	);
}

export default PaymentDialog;
