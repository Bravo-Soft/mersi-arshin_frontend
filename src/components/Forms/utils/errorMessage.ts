const errorMessage = (size: number) => `Не более ${size} символов`;

export const biggerLengthField = errorMessage(1024);
export const mediumLengthField = errorMessage(512);
export const largeLengthField = errorMessage(256);
export const smallLengthField = errorMessage(128);
