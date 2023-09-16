import { combineReducers } from "redux";
import AuthReducer from "./auth";
import GameReducer from './game';
import RatesReducer from './rates';

export const appReducer = combineReducers({
  auth: AuthReducer,
  game: GameReducer,
  rates: RatesReducer
});

export const rootReducer = (state, action) => {
  return appReducer(state, action);
};
