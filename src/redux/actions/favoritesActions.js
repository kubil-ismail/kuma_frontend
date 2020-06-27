/* eslint-disable import/prefer-default-export */
import { get, post, remove } from '../../services';

export const getFavorite = (request) => {
  return {
    type: 'GET_FAVORITE',
    payload: get({
      url: `profile/favorite/${request.id}`,
      body: {
        params: {
          limit: request.limit,
          page: request.page,
        },
        headers: {
          Authorization: request.apikey,
        },
      },
    }),
  };
};

export const addFavorite = (request) => {
  return {
    type: 'POST_FAVORITE',
    payload: post({
      url: 'favorite',
      body: {
        book_id: request.id,
        user_id: request.userId,
      },
      config: {
        headers: {
          Authorization: request.apikey,
        },
      },
    }),
  };
};

export const deleteFavorite = (request) => {
  return {
    type: 'DELETE_FAVORITE',
    payload: remove({
      url: `favorite/${request.id}`,
      body: {
        headers: {
          Authorization: request.apikey,
        },
      },
    }),
  };
};
