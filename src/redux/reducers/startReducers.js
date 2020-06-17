const initialState = {
  book: [],
  genre: []
}

const start = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_GENRE': {
      const { genre } = state
      genre.push(action.payload)
      return {
        ...initialState,
        genre: genre
      }
    }
    case 'FETCH_BOOK': {
      const { book } = state
      book.push(action.payload)
      return {
        ...initialState,
        book: book
      }
    }
    default: {
      return {
        ...state
      }
    }
  }
}

export default start