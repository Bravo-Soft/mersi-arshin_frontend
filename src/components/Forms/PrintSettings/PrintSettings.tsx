import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { enqueueSnackbar } from 'notistack';
import { FormProvider, useForm } from 'react-hook-form';

import { DEFAULT_SETTINGS } from './constants/defaultSettings';
import PrintBlock from './PrintBlock';
import { printSettingsResolver } from './utils/printSettingsResolver';
import { transformDataSettings } from './utils/transformDataSettings';

import { Messages } from 'constant/messages';
import { selectSidebarStateOfHomePage } from 'features/sidebar/sidebarSlice';
import {
	useGetUserPrintSettingsQuery,
	useUpdateUserPrintSettingsMutation,
} from 'features/user/userApiSlice';
import { useAppSelector } from 'hooks/redux';
import ButtonContainer from 'styled/ButtonContainer';
import FormContainer from 'styled/FormContainer';
import type { ISendData } from 'types/printSettings';

function PrintSettings() {
	const { open, selector } = useAppSelector(selectSidebarStateOfHomePage);

	const { data } = useGetUserPrintSettingsQuery(undefined, {
		skip: !open || selector !== 'PrintSettings',
	});

	const [sendUpdatedPrintSettings, { isLoading }] = useUpdateUserPrintSettingsMutation();

	const methods = useForm<ISendData>({
		mode: 'onChange',
		resolver: printSettingsResolver,
	});

	const {
		handleSubmit,
		formState: { isDirty },
	} = methods;

	const onSubmit = handleSubmit(async sendData => {
		try {
			const settings = transformDataSettings(sendData);
			await sendUpdatedPrintSettings(settings).unwrap();
			enqueueSnackbar(Messages.SETTINGS_SUCCESSFULLY_UPDATED, { variant: 'success' });
		} catch {
			enqueueSnackbar(Messages.FAILED_TO_CHANGE_PRINTING_OPTIONS, { variant: 'error' });
		}
	});

	const handleResetPrintSettings = async () => {
		try {
			await sendUpdatedPrintSettings(DEFAULT_SETTINGS).unwrap();
			enqueueSnackbar(Messages.SETTINGS_SUCCESSFULLY_RESET, { variant: 'success' });
		} catch {
			enqueueSnackbar(Messages.FAILED_TO_CHANGE_PRINTING_OPTIONS, { variant: 'error' });
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
				<Button variant='contained' fullWidth type='submit' disabled={isLoading || !isDirty}>
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
