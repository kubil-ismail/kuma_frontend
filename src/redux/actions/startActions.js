// Get All genre
export const genreList = (request) => {
  return {
    type: 'FETCH_GENRE',
    payload: request
  }
}

// Get Book limit 4
export const bookList = (request) => {
  return {
    type: 'FETCH_BOOK',
    payload: request
  }
}
