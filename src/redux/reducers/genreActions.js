const initialState = {
  loading: false,
  result: [],
};

const genre = (state = initialState, action) => {
  switch (action.type) {
    // BOOK
    case 'FETCH_GENRE_PENDING': {
      return {
        ...initialState,
        loading: true,
        result: [],
        options: [],
      };
    }
    case 'FETCH_GENRE_FULFILLED': {
      const { data, options } = action.payload.data;
      return {
        ...initialState,
        loading: false,
        result: data,
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

export default genre;
