import { AppReducers, RootState } from "@/store";
import { Store } from "@reduxjs/toolkit";
import { render as reactRender } from "@testing-library/react";
import { Provider } from "react-redux";

export type DeepPartial<T> = T extends object
  ? { [P in keyof T]?: DeepPartial<T[P]> }
  : T;

export const makeStore = (
  state: DeepPartial<RootState>,
): Store<RootState, any, any> => {
  return {
    getState: () => ({ ...state }),
    dispatch: vi.fn(),
    subscribe: vi.fn(),
  } as any; //need to work out type
};

export const render = (
  child: React.ReactElement,
  state?: DeepPartial<RootState>,
) => {
  return reactRender(
    <Provider store={makeStore(state === undefined ? {} : state)}>
      {child}
    </Provider>,
  );
};
