import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

interface IActionButtonsProps {
	onSelectFiles: React.MouseEventHandler<HTMLElement> | undefined;
	selectDisabled: boolean;
	hasFiles: boolean;
	onSaveFiles: () => void;
	disabled: boolean;
}

function ActionButtons({
	onSaveFiles,
	onSelectFiles,
	selectDisabled,
	hasFiles,
	disabled,
}: IActionButtonsProps): JSX.Element | null {
	if (!hasFiles) {
		return null;
	}

	return (
		<Stack direction='row' columnGap={1}>
			<Button onClick={onSelectFiles} disabled={selectDisabled || disabled}>
				Выбрать файлы
			</Button>
			<Button onClick={onSaveFiles} disabled={selectDisabled || disabled}>
				Сохранить
			</Button>
		</Stack>
	);
}

export default ActionButtons;
