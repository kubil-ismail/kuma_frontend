/* eslint-disable import/prefer-default-export */
import { get } from '../../services';

export const getBook = (request) => {
  return {
    type: 'FETCH_BOOK',
    payload: get({ url: `book${request}` }),
  };
};

export const getSimilar = (request) => {
  return {
    type: 'FETCH_SIMILAR',
    payload: get({ url: `book${request}` }),
  };
};

export const getReview = (request) => {
  return {
    type: 'FETCH_REVIEW',
    payload: get({
      url: 'review',
      body: {
        params: { book_id: request.id },
      },
    }),
  };
};
