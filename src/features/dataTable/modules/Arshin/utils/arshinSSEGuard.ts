import {
	isSseProcessType,
	isSseWorkingType,
	schemaArshinProcessStatus,
	schemaArshinProcessWorking,
} from '../config/arshinProcessConfig';

export const arshinSseGuardWorking = (data: unknown): data is isSseWorkingType =>
	schemaArshinProcessWorking.safeParse(data).success;
export const arshinSseGuardProcessStatus = (data: unknown): data is isSseProcessType =>
	schemaArshinProcessStatus.safeParse(data).success;
