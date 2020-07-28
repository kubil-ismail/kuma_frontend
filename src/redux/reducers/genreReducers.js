const defaultState = {
  loading: true,
  result: [],
  options: [],
};

const genre = (state = defaultState, action) => {
  switch (action.type) {
    // FETCH
    case 'FETCH_GENRE_PENDING': {
      return {
        ...defaultState,
      };
    }
    case 'FETCH_GENRE_FULFILLED': {
      const { data, options } = action.payload.data;
      return {
        ...defaultState,
        loading: false,
        result: data,
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

export default genre;
