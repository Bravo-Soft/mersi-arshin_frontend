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
export const schemaArshinRequestStatus = z.object({
	message: z.object({
		status: z.nativeEnum(ARSHIN_ACTION_NOTIFICATION),
		message: z.string(),
	}),
});
export const schemaArshinProcessWorking = z.object({
	isWorking: z.boolean(),
});

export type isSseProcessType = z.infer<typeof schemaArshinProcessStatus>;
export type isSseWorkingType = z.infer<typeof schemaArshinProcessWorking>;
export type isSseRequestType = z.infer<typeof schemaArshinRequestStatus>;
