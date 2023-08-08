import CachedIcon from '@mui/icons-material/Cached';
import DeleteIcon from '@mui/icons-material/Delete';
import { GridActionsCellItem, GridColDef } from '@mui/x-data-grid-pro';

import columns from 'features/dataTable/columns';
import { RenderCellExpand } from 'features/dataTable/components/RenderCellExpand';

export const columnsArshin: GridColDef[] = [
	...columns,
	{
		field: 'status',
		sortable: false,
		headerName: 'Статус',
		width: 200,
		headerAlign: 'center',
		type: 'singleSelect',
		valueOptions: ['Готово', 'Не удалось обновить', 'Ожидает'],
		renderCell: RenderCellExpand,
	},
	{
		field: 'actions',
		type: 'actions',
		headerName: 'Действия',
		width: 150,
		headerAlign: 'center',
		renderCell: () => [
			<GridActionsCellItem
				key='delete'
				icon={<DeleteIcon />}
				label='Удалить'
				onClick={() => console.log('удалить')}
			/>,
			<GridActionsCellItem
				key='refresh'
				icon={<CachedIcon />}
				label='Обновить'
				onClick={() => console.log('обновить')}
			/>,
		],
	},
];
