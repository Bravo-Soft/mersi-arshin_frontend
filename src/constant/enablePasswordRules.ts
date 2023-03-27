import { isBoolean } from 'guards/isBoolean';

export const ENABLE_PASSWORD_RULES = isBoolean(process.env.REACT_APP_ENABLE_PASSWORD_RULES);
