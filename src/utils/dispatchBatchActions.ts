import type { PayloadAction } from '@reduxjs/toolkit';

import type { AppDispatch } from 'app/store';

type ArrayOfActions<T> = Array<() => PayloadAction<T>>;

export const dispatchBatchActions = <T>(dispatch: AppDispatch, actions: ArrayOfActions<T>) =>
	actions.forEach(action => dispatch(action()));
