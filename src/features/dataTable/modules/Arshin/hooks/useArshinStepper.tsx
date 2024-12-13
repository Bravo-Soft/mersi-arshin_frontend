import { useState } from 'react';

import {
	selectNotValidArshinItem,
	selectPendingRequestItem,
	selectSelectedDataItems,
	setSelectedDataItems,
} from '../arshinTableSlice';

import { useSendingArshin } from './useSendingArshin';

import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { useSidebarAction } from 'hooks/useSidebarActions';
import { IRequestItem } from 'types/arshinIntegration';

export const useArshinStepper = () => {
	const dispatch = useAppDispatch();

	const [activeStep, setActiveStep] = useState(0);

	const { handleStart } = useSendingArshin();
	const { closeSidebar } = useSidebarAction('arshin');

	const arshinItems = useAppSelector(selectNotValidArshinItem);
	const model = useAppSelector(selectSelectedDataItems);
	const pendingRequest = useAppSelector(selectPendingRequestItem) as IRequestItem;

	const isLastStep = activeStep + 1 === arshinItems.length;

	const handleNext = () => {
		isLastStep || setActiveStep(prev => prev + 1);
	};

	const handleSendAction = async () => {
		handleNext();
		if (isLastStep) {
			closeSidebar();
			setActiveStep(0);
			setTimeout(async () => {
				await handleStart(pendingRequest);
			}, 1700);
		}
	};

	const handleBack = async () => {
		const modelFiltered = model.filter(({ id }) => id !== arshinItems[activeStep].id);
		// const modelIds = modelFiltered.map(({ id }) => id);

		dispatch(setSelectedDataItems(modelFiltered));
		handleNext();
		if (isLastStep) {
			await handleStart(pendingRequest);
			closeSidebar();
			setActiveStep(0);
		}
	};

	return { activeStep, handleNext, arshinItems, handleBack, handleSendAction };
};
