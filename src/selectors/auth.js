import { createSelector } from 'reselect';

export const userSelector = state => state.user;

export const loggedInSelector = createSelector(
  userSelector,
  user => !!user
);
