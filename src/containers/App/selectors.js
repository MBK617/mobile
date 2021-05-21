import { createSelector } from "reselect";

export const selectApp = createSelector(
  state => state.app,
  substate => substate.toJS()
);