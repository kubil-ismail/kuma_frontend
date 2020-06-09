import axios from 'axios'
const { REACT_APP_REST_URL } = process.env

export class genreService {
  async getGenre() {
    const result = await axios.get(`${REACT_APP_REST_URL}genre`)
    const { data } = result
    return data
  }
}