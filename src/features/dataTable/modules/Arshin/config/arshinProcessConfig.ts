import { z } from 'zod';

type StatusType = 'error' | 'default' | 'success' | 'warning' | 'info';

export const statusVariant: Record<ARSHIN_ACTION_NOTIFICATION, StatusType> = {
	canceled: 'error',
	deleted: 'error',
	added: 'info',
	ready: 'success',
	updated: 'info',
	process: 'info',
	synchronize: 'info',
};

export enum ARSHIN_ACTION_NOTIFICATION {
	ADDED = 'added',
	PROCESS = 'process',
	CANCELED = 'canceled',
	DELETED = 'deleted',
	UPDATED = 'updated',
	SYNCHRONIZE = 'synchronize',
	READY = 'ready',
}

export const schemaArshinProcessStatus = z.object({
	status: z.nativeEnum(ARSHIN_ACTION_NOTIFICATION),
	message: z.string(),
});
export const schemaArshinProcessWorking = z.object({
	isWorking: z.boolean(),
});

export type ArshinProcessStatusType = z.infer<typeof schemaArshinProcessStatus>;
export type ArshinProcessWorkingType = z.infer<typeof schemaArshinProcessWorking>;
