import FilterListIcon from '@mui/icons-material/FilterList';
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { useEffect, useState } from 'react';

interface INotificationAddButtonProps {
	index: number;
	watchEmailFilters: number;
	handleClickFilters: (index: number) => (event: React.MouseEvent<HTMLButtonElement>) => void;
}

function NotificationAddButton({
	index,
	watchEmailFilters,
	handleClickFilters,
}: INotificationAddButtonProps) {
	const [length, setlength] = useState(watchEmailFilters);

	useEffect(() => {
		setlength(watchEmailFilters);
	}, [index, watchEmailFilters]);

	return (
		<Tooltip title='Добавить Фильтр'>
			<IconButton aria-describedby='id' size='small' onClick={handleClickFilters(index)}>
				{length ? (
					<Badge color='primary' badgeContent={length}>
						<FilterListIcon />
					</Badge>
				) : (
					<FilterListIcon />
				)}
			</IconButton>
		</Tooltip>
	);
}
export default NotificationAddButton;
