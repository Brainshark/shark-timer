/*
  Quite honestly I have never worked with NgRx, or other state management libraries before,
  other than the getting started tutorial. Based on the context of that application,
  I would probably need to add things like the following to the State, and then implement the reducers:
  curerntView, timerActive, alarming, fullScreen, etc.
*/

import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';

// tslint:disable-next-line:no-empty-interface
export interface State {

}

export const reducers: ActionReducerMap<State> = {

};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
