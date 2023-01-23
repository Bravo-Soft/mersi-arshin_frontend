import type { GridInitialStatePro } from '@mui/x-data-grid-pro/models/gridStatePro';

export const parseTemplate = (value: string) => JSON.parse(value) as GridInitialStatePro;

export const stringfyTemplate = (template: GridInitialStatePro) => JSON.stringify(template);
