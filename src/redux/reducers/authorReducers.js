const defaultState = {
  loading: true,
  result: [],
  options: [],
};

const authors = (state = defaultState, action) => {
  switch (action.type) {
    // FETCH
    case 'FETCH_AUTHOR_PENDING': {
      return {
        ...defaultState,
      };
    }
    case 'FETCH_AUTHOR_FULFILLED': {
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

export default authors;
