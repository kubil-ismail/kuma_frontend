const initialState = {
  loading: false,
  result: [],
};

const book = (state = initialState, action) => {
  switch (action.type) {
    // BOOK
    case 'FETCH_BOOK_PENDING': {
      return {
        ...initialState,
        loading: true,
        result: [],
        options: [],
      };
    }
    case 'FETCH_BOOK_FULFILLED': {
      const { data, options } = action.payload.data;
      return {
        ...initialState,
        loading: false,
        result: data,
        options,
      };
    }
    // SIMILAR BOOK
    case 'FETCH_SIMILAR_PENDING': {
      return {
        ...initialState,
        loading: true,
        similar: [],
        options: [],
      };
    }
    case 'FETCH_SIMILAR_FULFILLED': {
      const { data, options } = action.payload.data;
      return {
        ...initialState,
        loading: false,
        similar: data,
        options,
      };
    }
    // REVIEW BOOK
    case 'FETCH_REVIEW_PENDING': {
      return {
        ...initialState,
        loading: true,
        review: [],
        options: [],
      };
    }
    case 'FETCH_REVIEW_FULFILLED': {
      const { data, options } = action.payload.data;
      return {
        ...initialState,
        loading: false,
        review: data,
        options,
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};

export default book;
