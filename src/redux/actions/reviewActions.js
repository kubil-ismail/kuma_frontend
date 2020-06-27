/* eslint-disable import/prefer-default-export */
import { get, post, remove } from '../../services';

// Get fetch review
export const fetchReview = (request) => {
  return {
    type: 'FETCH_REVIEW',
    payload: get({
      url: 'review',
      body: {
        params: {
          limit: request.limit,
          page: request.page,
        },
      },
    }),
  };
};

// Get selected review
export const selectReview = (request) => {
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

// ADD NEW Review
export const postReview = (request) => {
  return {
    type: 'POST_REVIEW',
    payload: post({
      url: 'review',
      body: {
        book_id: request.id,
        user_id: request.userId,
        rating: parseInt(request.ratingInput.value, 10),
        review: request.reviewInput,
      },
      config: {
        headers: {
          Authorization: request.apikey,
        },
      },
    }),
  };
};

// Delete selected Review
export const deleteReview = (request) => {
  return {
    type: 'DELETE_REVIEW',
    payload: remove({
      url: `review/${request.id}`,
      body: {
        headers: {
          Authorization: request.apikey,
        },
      },
    }),
  };
};
