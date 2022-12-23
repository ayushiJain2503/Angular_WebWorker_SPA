import { createAction, props } from '@ngrx/store';
import { userInput } from '../interfaces';

export const UPDATE_DATA = '[Data] Update User Input';
export const UPDATE_TIMER = '[Data] Update Timer';
export const UPDATE_SIZE = '[Data] Update Array Size';
export const UPDATE_ARRAY_IDS = '[Data] Update Array IDs';

export const updateData = createAction(
  UPDATE_DATA,
  props<{ data: userInput }>()
);
export const updateTimer = createAction(
  UPDATE_TIMER,
  props<{ timer: number }>()
);
export const updateSize = createAction(UPDATE_SIZE, props<{ size: number }>());
export const updateArrayIds = createAction(
  UPDATE_ARRAY_IDS,
  props<{ ids: string[] }>()
);
