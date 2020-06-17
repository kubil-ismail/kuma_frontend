import axios from 'axios'
import store from 'store2'
const { REACT_APP_REST_URL } = process.env

export class authorService {
  // Get Author limit 6
  async getAuthor() {
    const result = await axios.get(`${REACT_APP_REST_URL}author?limit=6`)
    const { data } = result
    return data
  }

  // Get All Author
  async getAllAuthor() {
    const result = await axios.get(`${REACT_APP_REST_URL}author`)
    const { data } = result
    return data
  }

  // Select data
  async getSelectData(id) {
    const result = await axios.get(`${REACT_APP_REST_URL}author/${id}`)
    const { data } = result
    return data.data[0]
  }

  // Add new Author
  async addAuthor(data) {
    const { authorName } = data
    const config = {
      headers: {
        'Authorization': store('apikey')
      }
    }

    try {
      await axios.post(`${REACT_APP_REST_URL}author`, {
        name: authorName
      }, config)
      return true
    } catch (error) {
      return error
    }
  }

  // Edit Author
  async editAuthor(data) {
    const { authorName, authorId } = data
    const config = {
      headers: {
        'Authorization': store('apikey')
      }
    }
    try {
      await axios.patch(`${REACT_APP_REST_URL}author/${authorId}`, {
        name: authorName
      }, config)
      return true
    } catch (error) {
      return error
    }
  }

  // Delete author
  async deleteAuthor(id) {
    const config = {
      headers: {
        'Authorization': store('apikey')
      }
    }
    try {
      await axios.delete(`${REACT_APP_REST_URL}author/${id}`, config)
      return true
    } catch (error) {
      return error
    }
  }
}