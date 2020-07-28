/* eslint-disable import/prefer-default-export */
import { get, patch } from '../../services';

// Select profile
export const selectProfile = (request) => {
  return {
    type: 'FETCH_PROFILE',
    payload: get({
      url: `profile/${request.id}`,
      body: {
        headers: {
          Authorization: request.apikey,
        },
      },
    }),
  };
};

// Update profile
export const updateProfile = (request) => {
  return {
    type: 'UPDATE_GENRE',
    payload: patch({
      url: `profile/${request.userId}`,
      body: {
        fullname: request.fullname,
        birthdate: request.birthday,
        gender: request.gender,
        bio: request.bio,
      },
      config: {
        headers: {
          Authorization: request.apikey,
        },
      },
    }),
  };
};
