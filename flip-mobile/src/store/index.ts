import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./reducers/auth";
import homeSlice from "./reducers/home";
import chatSlice from "./reducers/chat";
import connectionSlice from "./reducers/connection";
import userSlice from "./reducers/user";
import eventSlice from "./reducers/event";
import settingsSlice from "reducers/settings";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    home: homeSlice.reducer,
    chat: chatSlice.reducer,
    connection: connectionSlice.reducer,
    user: userSlice.reducer,
    event: eventSlice.reducer,
    settings: settingsSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
