import type { SelectChangeEvent } from '@mui/material';
import { useEffect, useState } from 'react';

import { CustomHeader } from '../components/CustomHeader';
import { defaultEncoding, encodings, defaultSeparator, separators } from '../constants';

export interface ICsv {
	encodedArrayBuffer: ArrayBuffer | null;
	customHeader: () => JSX.Element;
	isEmptyFile: boolean;
}

export const useCsv = (arrayBuffer: ArrayBuffer | null): ICsv => {
	const [encoding, setEncoding] = useState<string>(defaultEncoding);
	const [separator, setSeparator] = useState<string>(defaultSeparator);
	const [customSeparator, setCustomSeparator] = useState('');
	const [isVisibleCustomSeparatorInput, setIsVisibleCustomSeparatorInput] = useState(false);
	const [encodedArrayBuffer, setEncodedArrayBuffer] = useState<ArrayBuffer | null>(null);
	const [isEmptyFile, setIsEmptyFile] = useState(false);

	const handleChangeEncoding = (event: SelectChangeEvent): void => {
		setEncoding(event.target.value);
	};

	const handleChangeSeparator = (event: SelectChangeEvent): void => {
		const value = event.target.value;

		if (value === separators.custom.value) {
			setIsVisibleCustomSeparatorInput(true);
		} else {
			setIsVisibleCustomSeparatorInput(false);
		}

		setSeparator(value);
	};

	const handleChangeCustomSeparator = (event: SelectChangeEvent): void => {
		setCustomSeparator(event.target.value);
	};

	const customHeader = () =>
		CustomHeader({
			encodings,
			separators,
			encoding,
			handleChangeEncoding,
			defaultEncoding,
			separator,
			handleChangeSeparator,
			defaultSeparator,
			customSeparator,
			handleChangeCustomSeparator,
			isVisibleCustomSeparatorInput,
		});

	useEffect(() => {
		const getEncodedArrayBuffer = (arrayBuffer: ArrayBuffer | null): void => {
			const dec = new TextDecoder(encoding);
			const enc = new TextEncoder();

			let str = '';
			let arrBuff: ArrayBuffer = new ArrayBuffer(0);

			if (arrayBuffer) {
				const decodedStr = dec.decode(arrayBuffer);
				const sep = isVisibleCustomSeparatorInput ? customSeparator : separator;

				if (decodedStr.trim() !== '') {
					str = sep === '' ? `${decodedStr}` : `sep=${sep}\n${decodedStr}`;
				} else {
					setIsEmptyFile(true);
				}

				arrBuff = enc.encode(str);
			}

			setEncodedArrayBuffer(arrBuff);
		};

		getEncodedArrayBuffer(arrayBuffer);
	}, [arrayBuffer, customSeparator, encoding, isVisibleCustomSeparatorInput, separator]);

	return {
		encodedArrayBuffer,
		customHeader,
		isEmptyFile,
	};
};
