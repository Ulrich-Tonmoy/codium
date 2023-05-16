import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

import sourceReducer from "./sourceSlice";

const store = configureStore({
  reducer: {
    source: sourceReducer,
  },
});

export const SourceProvider = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) => {
  return <Provider store={store}>{children}</Provider>;
};
