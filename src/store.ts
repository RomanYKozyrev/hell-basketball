import { configureStore } from '@reduxjs/toolkit';

import { teamsReducer } from './features';

export const store = configureStore({
  reducer: {
    teams: teamsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
