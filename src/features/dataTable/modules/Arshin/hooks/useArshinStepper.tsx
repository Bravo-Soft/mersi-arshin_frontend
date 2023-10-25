import { useState } from 'react';

import {
	selectNotValidArshinItem,
	selectSelectedDataItems,
	setSelectedDataItems,
} from '../arshinTableSlice';

import { useSendingArshin } from './useSendingArshin';

import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { useSidebarAction } from 'hooks/useSidebarActions';

export const useArshinStepper = () => {
	const dispatch = useAppDispatch();

	const [activeStep, setActiveStep] = useState(0);

	const { handleStart } = useSendingArshin();
	const { closeSidebar } = useSidebarAction('arshin');

	const arshinItems = useAppSelector(selectNotValidArshinItem);
	const model = useAppSelector(selectSelectedDataItems);

	const isLastStep = activeStep + 1 === arshinItems.length;

	const handleNext = () => {
		isLastStep || setActiveStep(prev => prev + 1);
	};

	const handleSendAction = async () => {
		handleNext();
		isLastStep && closeSidebar();
		await handleStart(model.map(({ id }) => id));
	};

	const handleBack = async () => {
		const modelFiltered = model.filter(({ id }) => id !== arshinItems[activeStep].id);
		const modelIds = modelFiltered.map(({ id }) => id);

		dispatch(setSelectedDataItems(modelFiltered));
		handleNext();
		if (isLastStep) {
			handleStart(modelIds);
			closeSidebar();
		}
	};

	return { activeStep, handleNext, arshinItems, handleBack, handleSendAction };
};
