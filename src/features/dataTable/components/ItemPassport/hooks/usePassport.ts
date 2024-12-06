import dayjs from 'dayjs';
import ExcelJS from 'exceljs';
import { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';

import { repairColumns, summaryColumns, verificationColumns } from '../columns';
import { type ISummary } from '../types';

import {
	selectIsOpenPassportModal,
	selectPassportItem,
	setPassportModal,
} from 'features/dataTable/dataTableSlice';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { saveAs } from 'utils/saveAs';

export const usePassport = () => {
	const passportPrintRef = useRef<HTMLDivElement>(null);
	const dispatch = useAppDispatch();

	const open = useAppSelector(selectIsOpenPassportModal);
	const passportData = useAppSelector(selectPassportItem);

	const handleClosePassport = () => {
		dispatch(setPassportModal(false));
	};

	const handlePrint = useReactToPrint({
		content: () => passportPrintRef.current,
	});

	const exportPassportToXslx = async () => {
		const workbook = new ExcelJS.Workbook();
		const worksheet = workbook.addWorksheet('Паспорт данных СИ', {
			pageSetup: {
				//Формат печати А4
				paperSize: 9,
				orientation: 'portrait',
				fitToPage: true,
				horizontalCentered: true,
			},
		});

		//Изменение шрифта по умолчанию
		worksheet.getColumn('A').font = { size: 14 };
		worksheet.getColumn('B').font = { size: 14 };
		worksheet.getColumn('C').font = { size: 14 };
		worksheet.getColumn('D').font = { size: 14 };
		worksheet.getColumn('E').font = { size: 14 };
		worksheet.getColumn('F').font = { size: 14 };

		const boldCenterStyle = {
			font: { bold: true, size: 16 },
			alignment: { horizontal: 'center' as const, vertical: 'middle' as const },
		};
		const borderStyle = {
			border: {
				top: { style: 'thin' as ExcelJS.BorderStyle },
				left: { style: 'thin' as ExcelJS.BorderStyle },
				bottom: { style: 'thin' as ExcelJS.BorderStyle },
				right: { style: 'thin' as ExcelJS.BorderStyle },
			},
		};
		const headerStyle = {
			font: { size: 14 },
			height: 50,
			alignment: { horizontal: 'center' as const, vertical: 'middle' as const, wrapText: true },
		};

		// Добавление "Организация" и "Подразделение"
		worksheet.mergeCells('A1:C1');
		worksheet.getCell('A1').value = 'Организация';
		worksheet.getCell('A1').style = { ...boldCenterStyle };
		worksheet.getColumn('A').width = 20;
		worksheet.getColumn('B').width = 20;
		worksheet.getColumn('C').width = 20;

		worksheet.mergeCells('D1:F1');
		worksheet.getCell('D1').value =
			passportData?.organization || '_______________________________';
		worksheet.getColumn('D').width = 20;
		worksheet.getColumn('E').width = 20;
		worksheet.getColumn('F').width = 20;

		worksheet.mergeCells('A2:C2');
		worksheet.getCell('A2').value = 'Подразделение';
		worksheet.getCell('A2').style = { ...boldCenterStyle };

		worksheet.mergeCells('D2:F2');
		passportData?.division.forEach((el, index) => {
			worksheet.getCell(`D${2 + index}`).value = el;
		});

		//Разделитель
		worksheet.mergeCells('A3:F3');
		worksheet.getCell('A3').fill = {
			type: 'pattern',
			pattern: 'solid',
			fgColor: { argb: '014E5F' },
		};

		// Добавление заголовка "Паспорт"
		worksheet.mergeCells('A4:F4');
		worksheet.getCell('A4').value = 'Паспорт № __________';
		worksheet.getRow(4).height = 25;
		worksheet.getCell('A4').style = { ...boldCenterStyle };

		// Закрепляем номер строки
		let rowIndex = 5;

		// Секция с данными "Общая информация"
		summaryColumns.forEach(({ name, title }) => {
			worksheet.mergeCells(`A${rowIndex}:C${rowIndex}`);
			worksheet.getCell(`A${rowIndex}`).value = title;
			worksheet.getCell(`A${rowIndex}`).style = { ...boldCenterStyle };

			worksheet.mergeCells(`D${rowIndex}:F${rowIndex}`);
			worksheet.getCell(`D${rowIndex}`).value =
				passportData?.summaryData[name as keyof ISummary];

			rowIndex++;
		});

		//Разделитель
		worksheet.mergeCells(`A${rowIndex}:F${rowIndex}`);
		worksheet.getCell(`A${rowIndex}`).fill = {
			type: 'pattern',
			pattern: 'solid',
			fgColor: { argb: '014E5F' },
		};
		rowIndex++;

		// Добавление заголовка "Результаты метрологических работ"
		worksheet.mergeCells(`A${rowIndex}:F${rowIndex}`);
		worksheet.getRow(rowIndex).height = 25;
		worksheet.getCell(`A${rowIndex}`).value = 'Результаты метрологических работ (МР)';
		worksheet.getCell(`A${rowIndex}`).style = { ...boldCenterStyle };

		rowIndex++;

		// Заголовки таблицы "Результаты метрологических работ"
		worksheet.getRow(rowIndex).height = 40;
		verificationColumns.forEach((name, colIndex) => {
			const cell = worksheet.getCell(rowIndex, colIndex + 1);
			cell.value = name;
			cell.style = { ...headerStyle };
		});

		rowIndex++;

		// Заполнение данных "Результаты метрологических работ"
		passportData?.verifications.forEach(verification => {
			worksheet.getRow(rowIndex).values = [
				dayjs(verification.verificationDate).format('DD.MM.YYYY'),
				verification.workType,
				verification.document,
				verification.organization,
				verification.resolution,
				verification.fio,
			];

			rowIndex++;
		});

		worksheet.mergeCells(`A${rowIndex}:F${rowIndex}`);
		worksheet.getCell(`A${rowIndex}`).fill = {
			type: 'pattern',
			pattern: 'solid',
			fgColor: { argb: '014E5F' },
		};
		rowIndex++;

		// Добавление заголовка "Сведения о ремонте"
		worksheet.mergeCells(`A${rowIndex}:F${rowIndex}`);
		worksheet.getRow(rowIndex).height = 25;
		worksheet.getCell(`A${rowIndex}`).value = !passportData?.repairs.length
			? `Сведения о ремонте/техническом обслуживании/консервации отсутствуют`
			: `Сведения о ремонте/техническом обслуживании/консервации `;
		worksheet.getCell(`A${rowIndex}`).style = { ...boldCenterStyle };

		rowIndex++;

		if (passportData?.repairs.length) {
			// Заголовки таблицы "Сведения о ремонте"
			worksheet.getRow(rowIndex).height = 35;
			repairColumns.forEach((name, colIndex) => {
				worksheet.mergeCells(rowIndex, colIndex * 2 + 1, rowIndex, colIndex * 2 + 2);
				const cell = worksheet.getCell(rowIndex, colIndex * 2 + 1);
				cell.value = name;
				cell.style = { ...headerStyle };
			});

			rowIndex++;
			// Заполнение данных "Сведения о ремонте"
			passportData.repairs.forEach(repair => {
				worksheet.mergeCells(rowIndex, 1, rowIndex, 2);
				worksheet.mergeCells(rowIndex, 3, rowIndex, 4);
				worksheet.mergeCells(rowIndex, 5, rowIndex, 6);

				// Установка значений для объединённых столбцов
				worksheet.getCell(rowIndex, 1).value = dayjs(repair.modificationDate).format(
					'DD.MM.YYYY'
				);
				worksheet.getCell(rowIndex, 3).value = repair.conditionDescription;
				worksheet.getCell(rowIndex, 5).value = repair.editedBy;

				rowIndex++;
			});
		}

		//Разделитель
		worksheet.mergeCells(`A${rowIndex}:F${rowIndex}`);
		worksheet.getCell(`A${rowIndex}`).fill = {
			type: 'pattern',
			pattern: 'solid',
			fgColor: { argb: '014E5F' },
		};
		rowIndex++;

		// Обводим все ячейки в рабочем листе
		worksheet.eachRow(row => {
			row.eachCell(cell => {
				cell.style = { ...cell.style, ...borderStyle };
			});
		});

		// Устанавливаем область печати
		worksheet.pageSetup.printArea = `A1:F${rowIndex - 1}`;

		// Генерация файла
		const buffer = await workbook.xlsx.writeBuffer();
		saveAs(new Blob([buffer]), `Паспорт_данных_СИ.xlsx`);
	};

	return {
		passportPrintRef,
		open,
		handlePrint,
		handleClosePassport,
		exportPassportToXslx,
		isLoading: !passportData,
	};
};
