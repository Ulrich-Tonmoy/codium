import { configureStore } from "@reduxjs/toolkit";
import mainSlice from "./editorSlice";

export const store = configureStore({
  reducer: {
    main: mainSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["main/updateActiveFiles", "main/updateActiveFile"],
        ignoredPaths: ["main.activeFiles", "main.activeFile"],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
