import {
  ActionReducer,
  ActionReducerMap,
  MetaReducer,
  createFeatureSelector,
  createSelector
} from '@ngrx/store';
import * as fromData from './data.reducer';

export interface State {
  data: fromData.State;
}

export const reducers: ActionReducerMap<State> = {
  data: fromData.reducer
};

export function appState(reducer: ActionReducer<any>): ActionReducer<any> {
  return function (state, action) {
    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<State>[] = [appState];

export const getUserInputState = createFeatureSelector<fromData.State>('data');

export const getUserInput = createSelector(
  getUserInputState,
  fromData.getUserData
);
