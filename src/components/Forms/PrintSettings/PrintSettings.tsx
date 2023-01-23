import { FormProvider, useForm } from 'react-hook-form';
import { selectSidebarStateOfHomePage } from 'features/sidebar/sidebarSlice';
import {
	useGetUserPrintSettingsQuery,
	useUpdateUserPrintSettingsMutation,
} from 'features/user/userApiSlice';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { DEFAULT_SETTINGS } from './constants/defaultSettings';
import { transformDataSettings } from './utils/transformDataSettings';

import type { ISendData } from 'types/printSettings';

import Box from '@mui/material/Box';
import PrintBlock from './PrintBlock';
import Button from '@mui/material/Button';
import FormContainer from 'styled/FormContainer';
import ButtonContainer from 'styled/ButtonContainer';
import useNotification from 'hooks/useNotification';

function PrintSettings() {
	const { open, selector } = useAppSelector(selectSidebarStateOfHomePage);

	const dispatch = useAppDispatch();
	const showNotification = useNotification(dispatch);

	const { data } = useGetUserPrintSettingsQuery(undefined, {
		skip: !open || selector !== 'PrintSettings',
	});

	const [sendUpdatedPrintSettings, { isLoading }] = useUpdateUserPrintSettingsMutation();

	const methods = useForm<ISendData>({
		mode: 'onChange',
	});

	const { handleSubmit } = methods;

	const onSubmit = handleSubmit(async sendData => {
		try {
			const settings = transformDataSettings(sendData);
			await sendUpdatedPrintSettings(settings).unwrap();
			showNotification('SETTINGS_SUCCESSFULY_UPDATED', 'success');
		} catch {
			showNotification('FAILED_TO_CHANGE_PRINTING_OPTIONS', 'error');
		}
	});

	const handleResetPrintSettings = async () => {
		try {
			await sendUpdatedPrintSettings(DEFAULT_SETTINGS).unwrap();
			showNotification('SETTINGS_SUCCESSFULY_RESETED', 'success');
		} catch {
			showNotification('FAILED_TO_CHANGE_PRINTING_OPTIONS', 'error');
		}
	};

	return (
		<FormContainer onSubmit={onSubmit}>
			<Box px={3.5} display='flex' flexDirection='column' flexGrow={1} rowGap={2}>
				<FormProvider {...methods}>
					<PrintBlock data={data?.small} nameControl='small-' />
					<PrintBlock data={data?.medium} nameControl='medium-' />
					<PrintBlock data={data?.large} nameControl='large-' />
				</FormProvider>
			</Box>
			<ButtonContainer sx={{ columnGap: 2, mt: 4 }}>
				<Button variant='contained' fullWidth type='submit' disabled={isLoading}>
					Сохранить
				</Button>
				<Button fullWidth onClick={handleResetPrintSettings} disabled={isLoading}>
					Сбросить
				</Button>
			</ButtonContainer>
		</FormContainer>
	);
}

export default PrintSettings;
