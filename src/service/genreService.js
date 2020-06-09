import axios from 'axios'

export class genreService {
  async getGenre() {
    const result = await axios.get('http://localhost:8000/genre')
    const { data } = result
    return data
  }
}