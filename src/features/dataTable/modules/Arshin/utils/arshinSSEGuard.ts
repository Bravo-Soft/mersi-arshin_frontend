import {
	ArshinProcessStatusType,
	ArshinProcessWorkingType,
	schemaArshinProcessStatus,
	schemaArshinProcessWorking,
} from '../config/arshinProcessConfig';

export const ArshinSseGuardWorking = (data: unknown): data is ArshinProcessWorkingType =>
	schemaArshinProcessWorking.safeParse(data).success;

export const ArshinSseGuardProcessStatus = (data: unknown): data is ArshinProcessStatusType =>
	schemaArshinProcessStatus.safeParse(data).success;
