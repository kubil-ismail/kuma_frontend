import { combineReducers } from 'redux';

// Reducers
import authors from './authorReducers';
import books from './bookReducers';
import favorites from './favoriteReducers';
import genres from './genreReducers';
import reviews from './reviewReducers';
import profile from './profileReducers';

export default combineReducers({
  authors,
  books,
  favorites,
  genres,
  reviews,
  profile,
});
