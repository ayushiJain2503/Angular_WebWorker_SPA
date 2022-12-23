import { Action, createReducer, on } from '@ngrx/store';
import { userInput } from '../interfaces';
import * as dataActions from './data.action';

export interface State {
  userData: userInput;
}

export const initialState: State = {
  userData: {
    timer: 0,
    size: 0,
    arrayIds: []
  }
};

const dataReducer = createReducer(
  initialState,
  on(dataActions.updateData, (state, { data }) => ({
    ...state,
    userData: data
  })),
  on(dataActions.updateTimer, (state, { timer }) => ({
    ...state,
    userData: { ...state.userData, timer: timer }
  })),
  on(dataActions.updateSize, (state, { size }) => ({
    ...state,
    userData: { ...state.userData, size: size }
  })),
  on(dataActions.updateArrayIds, (state, { ids }) => ({
    ...state,
    userData: { ...state.userData, arrayIds: ids }
  }))
);

export function reducer(state: State | undefined, action: Action): any {
  return dataReducer(state, action);
}

export const getUserData = (state: State) => {
  return {
    data: state.userData
  };
};
