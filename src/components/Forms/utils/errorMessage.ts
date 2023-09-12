const errorMessage = (size: number) => `Длина строки не может быть больше ${size}`;

export const largeLengthField = errorMessage(256);
export const smallLengthField = errorMessage(128);
