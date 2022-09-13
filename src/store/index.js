import { configureStore } from '@reduxjs/toolkit';
import { reducer as themeReducer } from './theme';
import dispatcher from '../util/dispatcher';

const store = configureStore({
  reducer: {
    theme: themeReducer,
  },
});

dispatcher.link(
  'themeChanged',
  /** @param {import("./theme").ThemeObject} appliedTheme */ (appliedTheme) => {
    setTimeout(() => store.dispatch(showMessage(appliedTheme.name)));
  }
);

export default store;
