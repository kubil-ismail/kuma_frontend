import { combineReducers } from 'redux';

import books from './bookReducers';
import favorites from './favoriteReducers';

export default combineReducers({
  books,
  favorites,
});
