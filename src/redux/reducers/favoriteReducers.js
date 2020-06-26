const initialState = {
  loading: false,
  result: [],
};

const favorite = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_FAVORITE_PENDING': {
      return {
        ...initialState,
        loading: true,
      };
    }
    case 'GET_FAVORITE_FULFILLED': {
      const { data, options } = action.payload.data;
      return {
        ...initialState,
        loading: false,
        result: data,
        options,
      };
    }
    case 'POST_FAVORITE_PENDING': {
      return {
        ...initialState,
        loading: true,
      };
    }
    case 'POST_FAVORITE_FULFILLED': {
      return {
        ...initialState,
        loading: false,
      };
    }
    case 'DELETE_FAVORITE_PENDING': {
      return {
        ...initialState,
        loading: true,
      };
    }
    case 'DELETE_FAVORITE_FULFILLED': {
      return {
        ...initialState,
        loading: false,
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};

export default favorite;
