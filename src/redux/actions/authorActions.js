/* eslint-disable import/prefer-default-export */
import { get, post, patch, remove } from '../../services';

// Get all author
export const fetchAuthor = (request) => {
  return {
    type: 'FETCH_AUTHOR',
    payload: get({ url: `author/${request ? request.id : ''}` }),
  };
};

// Add New author
export const postAuthor = (request) => {
  return {
    type: 'POST_AUTHOR',
    payload: post({
      url: 'author',
      body: {
        name: request.name,
      },
      config: {
        headers: {
          Authorization: request.apikey,
        },
      },
    }),
  };
};

// Edit Selected author
export const updateAuthor = (request) => {
  return {
    type: 'UPDATE_AUTHOR',
    payload: patch({
      url: `author/${request.id}`,
      body: {
        name: request.name,
      },
      config: {
        headers: {
          Authorization: request.apikey,
        },
      },
    }),
  };
};

// Delete Selected author
export const deleteAuthor = (request) => {
  return {
    type: 'DELETE_AUTHOR',
    payload: remove({
      url: `author/${request.id}`,
      body: {
        headers: {
          Authorization: request.apikey,
        },
      },
    }),
  };
};
