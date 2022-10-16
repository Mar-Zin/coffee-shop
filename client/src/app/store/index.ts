import { Action, combineReducers, configureStore, ThunkAction } from "@reduxjs/toolkit";
import catalogReducer from "./catalog";
import commentsReducer from "./comments";
import usersReducer from "./users";

const rootReducer = combineReducers({
  catalog: catalogReducer,
  users: usersReducer,
  comments: commentsReducer,
});

export function createStore() {
  return configureStore({
    reducer: rootReducer,
  });
}


export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof createStore>
export type AppDispatch = AppStore['dispatch']
export type AppThunk = ThunkAction<Promise<any>, RootState, unknown, Action>;