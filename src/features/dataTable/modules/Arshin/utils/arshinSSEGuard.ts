import {
	isSseProcessType,
	isSseRequestType,
	isSseWorkingType,
	schemaArshinProcessStatus,
	schemaArshinProcessWorking,
	schemaArshinRequestStatus,
} from '../config/arshinProcessConfig';

export const arshinSseGuardWorking = (data: unknown): data is isSseWorkingType =>
	schemaArshinProcessWorking.safeParse(data).success;
export const arshinSseGuardProcessStatus = (data: unknown): data is isSseProcessType =>
	schemaArshinProcessStatus.safeParse(data).success;
export const arshinSseGuardRequestStatus = (data: unknown): data is isSseRequestType =>
	schemaArshinRequestStatus.safeParse(data).success;
