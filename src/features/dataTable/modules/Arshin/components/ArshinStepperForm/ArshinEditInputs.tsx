import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import MobileStepper from '@mui/material/MobileStepper';

import { useValdatingForm } from '../../hooks/useValdatingForm';

import EditArshinItem from './EditArshinItem';

import { INotValidArshinItem } from 'types/arshinIntegration';

type Props = {
	arshinItems: INotValidArshinItem[];
	activeStep: number;
	handleBack: () => Promise<void>;
	isLastStep: boolean;
};

function ArshinEditInputs({ arshinItems, activeStep, handleBack, isLastStep }: Props) {
	// useValdatingForm();

	return (
		<>
			<EditArshinItem />
			<MobileStepper
				variant='text'
				steps={arshinItems.length}
				position='static'
				activeStep={activeStep}
				sx={{ border: 'none', borderTop: '1px' }}
				nextButton={
					<Button sx={{ lineHeight: 1 }} type='submit'>
						{isLastStep ? 'Отправить' : 'Изменить'}
					</Button>
				}
				backButton={
					<Button
						sx={{ color: 'text.disabled', lineHeight: 1 }}
						startIcon={<CloseIcon />}
						onClick={handleBack}
					>
						Пропустить
					</Button>
				}
			/>
		</>
	);
}
export default ArshinEditInputs;
