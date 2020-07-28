const defaultState = {
  loading: false,
  detail: [],
  options: [],
};

const review = (state = defaultState, action) => {
  switch (action.type) {
    // REVIEW
    case 'FETCH_REVIEW_PENDING': {
      return {
        ...defaultState,
        loading: true,
      };
    }
    case 'FETCH_REVIEW_FULFILLED': {
      const { data, options } = action.payload.data;
      return {
        ...defaultState,
        loading: false,
        detail: data,
        options,
      };
    }
    // DEFAULT
    default: {
      return {
        ...state,
      };
    }
  }
};

export default review;
