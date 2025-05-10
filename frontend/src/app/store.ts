import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { artistsReducer } from "../features/artists/artistsSlice.ts";
import { albumsReducer } from "../features/albums/albumsSlice.ts";
import { tracksReducer } from "../features/tracks/tracksSlice.ts";
import { usersReducer } from "../features/users/usersSlice.ts";
import storage from "redux-persist/lib/storage";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from "redux-persist";
import { trackHistoryReducer } from "../features/trackHistory/trackHistorySlice.ts";
import { adminArtistsReducer } from "../features/admin/artists/artistsAdminSlice.ts";

const userPersistConfig = {
  key: "store:users",
  storage,
  whitelist: ["user"],
};

const rootReducer = combineReducers({
  artists: artistsReducer,
  albums: albumsReducer,
  tracks: tracksReducer,
  trackHistory: trackHistoryReducer,
  users: persistReducer(userPersistConfig, usersReducer),
  adminArtists: adminArtistsReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
