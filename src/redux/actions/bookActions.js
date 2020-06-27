/* eslint-disable import/prefer-default-export */
import { get, addBook, patch, remove, cover } from '../../services';

// GET ALL book
export const fetchBook = (request) => {
  return {
    type: 'FETCH_BOOK',
    payload: get({ url: `book${request}` }),
  };
};

// SELECT one book
export const selectBook = (request) => {
  return {
    type: 'FETCH_DETAIL',
    payload: get({ url: `book${request}` }),
  };
};

// GET ALL similar book
export const fetchSimilar = (request) => {
  return {
    type: 'FETCH_SIMILAR',
    payload: get({ url: `book${request}` }),
  };
};

// Add New book
export const postBook = (request) => {
  return {
    type: 'POST_BOOK',
    payload: addBook(request.data, request.apikey),
  };
};

// UPDATE selected book
export const updateBook = (id, request, apikey) => {
  return {
    type: 'UPDATE_BOOK',
    payload: patch({
      url: `book/${id}`,
      body: {
        name: request.bookName || request.book.name,
        description: request.bookDesc || request.book.description,
        genre_id: request.bookGenre.value ? request.bookGenre.value : request.book.genre_id,
        author_id: request.bookAuthor.value ? request.bookAuthor.value : request.book.author_id,
        status_id: request.bookStatus.value ? request.bookStatus.value : request.book.status_id,
        published: request.bookPublished || request.book.published,
        language: request.bookLanguage || request.book.language,
      },
      config: {
        headers: {
          Authorization: apikey,
        },
      },
    }),
  };
};

// UPDATE cover book
export const updateCover = (request) => {
  return {
    type: 'UPDATE_BOOK',
    payload: cover(request.id, {
      image: request.picture,
      apikey: request.apikey,
    }),
  };
};

// Remove selected book
export const removeBook = (request) => {
  return {
    type: 'DELETE_BOOK',
    payload: remove({
      url: `book/${request.id}`,
      body: {
        headers: {
          Authorization: request.apikey,
        },
      },
    }),
  };
};
