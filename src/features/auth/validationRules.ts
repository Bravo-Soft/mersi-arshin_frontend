import { ENABLE_PASSWORD_RULES } from 'constant/enablePasswordRules';
import type { RegisterOptions } from 'react-hook-form';
import type { IAuthFormRequest } from './authApiSlice';

type AuthValidationRules = Record<keyof IAuthFormRequest, RegisterOptions>;

export const minLength = 7;
export const maxLength = 15;

export const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/gi;
const passwordPattern =
	/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[,.;:!?\-_()])[a-zA-Z0-9,.;:!?\-_()]+$/g;

const getExtendedPasswordRules = (): Pick<RegisterOptions, 'maxLength' | 'pattern'> => ({
	maxLength: {
		value: maxLength,
		message: `Максимальная длина пароля ${maxLength} символов`,
	},
	pattern: {
		value: passwordPattern,
		message: 'Пароль не соответствует правилам безопасности',
	},
});

export const validationRules: AuthValidationRules = {
	email: {
		required: 'Введите адрес почты',
		pattern: {
			value: emailPattern,
			message: 'Введите email в верном формате',
		},
	},
	password: {
		required: 'Введите пароль',
		minLength: {
			value: minLength,
			message: `Минимальная длина пароля ${minLength} символов`,
		},
		...(ENABLE_PASSWORD_RULES && getExtendedPasswordRules()),
	},
};


