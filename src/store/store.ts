import { AnyAction, combineReducers } from "redux";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import thunk, { ThunkDispatch } from "redux-thunk";
import { configureStore } from "@reduxjs/toolkit";
import { usersReducer } from "../reducers/usersReducer";
import { authReducer } from "../reducers/authReducer";
import { appReducer } from "../reducers/appReducer";

const rootReducer = combineReducers({
  users: usersReducer,
  auth: authReducer,
  app: appReducer,
});
export type AppRootStateType = ReturnType<typeof rootReducer>;
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> =
  useSelector;

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunk),
});

type DispatchType = ThunkDispatch<AppRootStateType, unknown, AnyAction>;

export const useAppDispatch = () => useDispatch<DispatchType>();

//@ts-ignore
window.store = store;
