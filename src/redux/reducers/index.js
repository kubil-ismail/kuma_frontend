import { combineReducers } from 'redux';

import books from './bookReducers';
import genre from './genreActions';

export default combineReducers({
  books,
  genre,
});
