import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import storage from "redux-persist/lib/storage";
import { rootReducer } from "./root-reducer";
import { persistReducer } from "redux-persist";
import thunk from "redux-thunk";
import { AuthInitialState } from "./auth";
import { GameInitialState } from "./game";
import { RatesInitialState } from "./rates";

const persistConfig = {
  key: "root",
  storage: storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const initialStoreState = {
  auth: AuthInitialState,
  game: GameInitialState,
  rates: RatesInitialState
};

const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
  preloadedState: initialStoreState,
});

setupListeners(store.dispatch);

export default store;
