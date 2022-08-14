import {legacy_createStore as createStore, combineReducers} from "redux";

import * as authStore from "./auth";

const reducer =combineReducers({
  auth: authStore.reducer,
});

export const store = createStore(reducer);