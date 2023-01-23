import DeletingDialog from './DeletingDialog';
import PaymentDialog from './PaymentDialog';

import type { SmartDialogVariants } from './smartDialogSlice';

export interface ISmartDialogProps {
	variant: SmartDialogVariants;
}

function SmartDialog({ variant }: ISmartDialogProps): JSX.Element {
	return variant === 'payment' ? <PaymentDialog /> : <DeletingDialog />;
}

export default SmartDialog;
