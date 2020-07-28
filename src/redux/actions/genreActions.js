/* eslint-disable import/prefer-default-export */
import { get, post, patch, remove } from '../../services';

// Get all genre
export const fetchGenre = (request) => {
  return {
    type: 'FETCH_GENRE',
    payload: get({ url: `genre/${request ? request.id : ''}` }),
  };
};

// Add New genre
export const postGenre = (request) => {
  return {
    type: 'POST_GENRE',
    payload: post({
      url: 'genre',
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

// Edit Selected genre
export const updateGenre = (request) => {
  return {
    type: 'UPDATE_GENRE',
    payload: patch({
      url: `genre/${request.id}`,
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

// Delete Selected genre
export const deleteGenre = (request) => {
  return {
    type: 'DELETE_GENRE',
    payload: remove({
      url: `genre/${request.id}`,
      body: {
        headers: {
          Authorization: request.apikey,
        },
      },
    }),
  };
};
