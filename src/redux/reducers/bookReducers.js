const defaultState = {
  loading: false,
  books: [],
  detail: [],
  options: [],
  similar: [],
};

const book = (state = defaultState, action) => {
  switch (action.type) {
    // BOOK
    case 'FETCH_BOOK_PENDING': {
      return {
        ...defaultState,
        loading: true,
      };
    }
    case 'FETCH_BOOK_FULFILLED': {
      const { data, options } = action.payload.data;
      return {
        ...defaultState,
        loading: false,
        books: data,
        options,
      };
    }
    // DETAIL
    case 'FETCH_DETAIL_PENDING': {
      return {
        ...defaultState,
        loading: true,
      };
    }
    case 'FETCH_DETAIL_FULFILLED': {
      const { data, options } = action.payload.data;
      return {
        ...defaultState,
        loading: false,
        detail: data[0],
        options,
      };
    }
    // SIMILAR
    case 'FETCH_SIMILAR_PENDING': {
      return {
        ...defaultState,
        loading: true,
      };
    }
    case 'FETCH_SIMILAR_FULFILLED': {
      const { data, options } = action.payload.data;
      return {
        ...defaultState,
        loading: false,
        similar: data,
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

export default book;
