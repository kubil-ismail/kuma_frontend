const defaultState = {
  loading: true,
  result: [],
  options: [],
};

const profile = (state = defaultState, action) => {
  switch (action.type) {
    // FETCH
    case 'FETCH_PROFILE_PENDING': {
      return {
        ...defaultState,
      };
    }
    case 'FETCH_PROFILE_FULFILLED': {
      const { data, options } = action.payload.data;
      return {
        ...defaultState,
        loading: false,
        result: data[0],
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

export default profile;
