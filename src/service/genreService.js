import axios from 'axios'
import store from 'store2'
const { REACT_APP_REST_URL } = process.env

export class genreService {
  // Get genre limit 6
  async getGenre() {
    const result = await axios.get(`${REACT_APP_REST_URL}genre?limit=6`)
    const { data } = result
    return data
  }

  // Get All genre
  async getAllGenre() {
    const result = await axios.get(`${REACT_APP_REST_URL}genre`)
    const { data } = result
    return data
  }

  // Select data
  async getSelectData(id) {
    const result = await axios.get(`${REACT_APP_REST_URL}genre/${id}`)
    const { data } = result
    return data.data[0]
  }

  // Add new genre
  async addGenre(data) {
    const { genreName } = data
    const config = {
      headers: {
        'Authorization': store('apikey')
      }
    }

    try {
      await axios.post(`${REACT_APP_REST_URL}genre`, {
        name: genreName
      }, config)
      return true
    } catch (error) {
      return error
    }
  }

  // Edit Genre
  async editGenre(data) {
    const { genreName, genreId } = data
    const config = {
      headers: {
        'Authorization': store('apikey')
      }
    }
    try {
      await axios.patch(`${REACT_APP_REST_URL}genre/${genreId}`, {
        name: genreName
      }, config)
      return true
    } catch (error) {
      return error
    }
  }

  // Delete genre
  async deleteGenre(id) {
    const config = {
      headers: {
        'Authorization': store('apikey')
      }
    }
    try {
      await axios.delete(`${REACT_APP_REST_URL}genre/${id}`, config)
      return true
    } catch (error) {
      return error
    }
  }
}