import {legacy_createStore as createStore, combineReducers} from "redux";
import { persistReducer } from "redux-persist";
import storage from 'redux-persist/lib/storage';

import * as authStore from "./auth";

const persistConfig = {
  key: "root",
  // localStorage에 저장합니다.
  storage,
  // auth, board, studio 3개의 reducer 중에 auth reducer만 localstorage에 저장합니다.
  whitelist: ["authStore"]
  // blacklist -> 그것만 제외합니다
};

const reducer =combineReducers({
  auth: authStore.reducer,
});

export const store = createStore(reducer);

export default persistReducer(persistConfig, reducer);
