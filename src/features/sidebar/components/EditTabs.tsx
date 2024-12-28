import AttachFileIcon from '@mui/icons-material/AttachFile';
import EditIcon from '@mui/icons-material/Edit';
import EngineeringIcon from '@mui/icons-material/Engineering';
import { Tab, Tabs, Tooltip } from '@mui/material';

import { useEditActions } from './useEditActions';

import { SidebarTitles } from 'constant/sidebarTitles';

export const EditTabs = ({ currentSelector }: { currentSelector: string }) => {
	const { hasAccess, handleOpenEditForm, handleOpenVerificationForm, handleOpenFilesForm } =
		useEditActions();
	const editSidebarElements = [
		{
			value: 'EditDataItem',
			icon: <EditIcon />,
			tooltip: hasAccess ? SidebarTitles.EDIT_ITEM : SidebarTitles.ITEM_INFORMATION,
			onChange: handleOpenEditForm,
			active: true,
		},
		{
			value: 'VerificateDataItem',
			icon: <EngineeringIcon />,
			tooltip: SidebarTitles.VERIFICATION_ITEM,
			onChange: handleOpenVerificationForm,
			active: true,
		},
		{
			value: 'FilesDataItem',
			icon: <AttachFileIcon />,
			tooltip: SidebarTitles.ITEM_FILES,
			onChange: handleOpenFilesForm,
			active: hasAccess,
		},
	];

	const handleChangeTab = (_: React.SyntheticEvent, newValue: string) => {
		const selectedElement = editSidebarElements.find(({ value }) => value === newValue);
		if (selectedElement) {
			selectedElement.onChange();
		}
	};

	return (
		<Tabs
			value={editSidebarElements.findIndex(({ value }) => value === currentSelector)}
			indicatorColor='secondary'
			variant='fullWidth'
			onChange={handleChangeTab}
			sx={{
				borderBottom: '1px solid #ccc',
				backgroundColor: '#f1f1f1',
				borderRadius: '4px',
				mb: 1,
			}}
		>
			{editSidebarElements.map(({ value, icon, tooltip, active }) => {
				return (
					<Tooltip title={tooltip} key={value}>
						<Tab
							disabled={!active}
							value={value}
							icon={icon}
							sx={{
								borderRadius: '4px',
								border: '1px solid #fff',
								'&.Mui-selected': {
									backgroundColor: '#014E5F',
									color: '#fff',
									transform: 'scale 110%',
								},
								'&:hover': {
									backgroundColor: '#d0d0d0',
								},
								'&.Mui-selected:hover': {
									backgroundColor: '#014E5F',
								},
							}}
						/>
					</Tooltip>
				);
			})}
		</Tabs>
	);
};
