import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import combinedReducer from "./rootReducer";

export const reducer = (state, action) => {
  return combinedReducer(state, action);
};

export const makeStore = () => {
  const isServer = typeof window === "undefined";
  if (isServer) {
    return configureStore({ reducer });
  } else {
    //If it's on client side, create a store which will persist
    const { persistStore, persistReducer, createTransform } = require("redux-persist");
    const storage = require("redux-persist/lib/storage/session").default;

    const persistConfig = {
      key: "auth",
      whitelist: ["login"], // only counter will be persisted, add other reducers if needed
      storage, // if needed, use a safer storage
    };

    const persistedReducer = persistReducer(persistConfig, reducer); // Create a new reducer with our existing reducer

    const store = configureStore({
      reducer: persistedReducer,
      middleware: getDefaultMiddleware({
        serializableCheck: false,
      }),
      devTools: true,
    });

    store.__persistor = persistStore(store); // This creates a persistor object & push that persisted object to .__persistor, so that we can avail the persistability feature

    return store;
  }
};

export const wrapper = createWrapper(makeStore);
