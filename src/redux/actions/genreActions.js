/* eslint-disable import/prefer-default-export */
import { get } from '../../services';

export const getBook = (request) => {
  return {
    type: 'FETCH_GENRE',
    payload: get({ url: `genre${request}` }),
  };
};
