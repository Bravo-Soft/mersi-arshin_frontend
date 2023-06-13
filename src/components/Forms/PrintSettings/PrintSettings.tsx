import { selectSidebarStateOfHomePage } from 'features/sidebar/sidebarSlice';
import {
	useGetUserPrintSettingsQuery,
	useUpdateUserPrintSettingsMutation,
} from 'features/user/userApiSlice';
import { useAppSelector } from 'hooks/redux';
import { FormProvider, useForm } from 'react-hook-form';
import { DEFAULT_SETTINGS } from './constants/defaultSettings';
import { transformDataSettings } from './utils/transformDataSettings';

import type { ISendData } from 'types/printSettings';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Messages } from 'constant/messages';
import { enqueueSnackbar } from 'notistack';
import ButtonContainer from 'styled/ButtonContainer';
import FormContainer from 'styled/FormContainer';
import PrintBlock from './PrintBlock';

function PrintSettings() {
	const { open, selector } = useAppSelector(selectSidebarStateOfHomePage);

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
