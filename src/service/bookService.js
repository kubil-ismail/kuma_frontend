import axios from 'axios'
const { REACT_APP_REST_URL } = process.env

export class bookService {
  // Get book limit 4
  async getBook() {
    const result = await axios.get(`${REACT_APP_REST_URL}book?limit=4`)
    const { data } = result
    return data
  }

  // Get Detail Book
  async getBookDetail(id) {
    const result = await axios.get(`${REACT_APP_REST_URL}book/${id}`)
    const { data } = result
    return data.data[0]
  }

  // Get All Books
  async getAllBook(param) {
    const result = await axios.get(`${REACT_APP_REST_URL}book${param}`)
    const { data } = result
    return data
  }

  // Add New Book
  async addBook(data) {
    const formData = new FormData()
    const { bookName, bookDesc, file, bookPublished, bookLanguage } = data

    formData.append('name', bookName)
    formData.append('description', bookDesc)
    formData.append('picture', file)
    formData.append('genreId', 1)
    formData.append('authorId', 1)
    formData.append('statusId', 1)
    formData.append('published', bookPublished)
    formData.append('language', bookLanguage)

    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    }

    try {
      await axios.post(`${REACT_APP_REST_URL}book`, formData, config)
      return true
    } catch (error) {
      return error
    }
  }

  // Patch Data Book
  async editBook(data, id) {
    const { bookName, bookDesc, bookPublished, bookLanguage } = data
    try {
      await axios.patch(`${REACT_APP_REST_URL}book/${id}`, {
        name: bookName,
        description: bookDesc,
        genre_id: 1,
        author_id: 1,
        status_id: 1,
        published: bookPublished,
        language: bookLanguage
      })
    } catch (error) {
      return error
    }
  }

  // Update Cover
  async editCover(picture, id) {
    const formData = new FormData()
    formData.append('picture', picture)

    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    }

    try {
      await axios.patch(`${REACT_APP_REST_URL}book/cover/${id}`, formData, config)
      return true
    } catch (error) {
      return error      
    }
  }

  // Delete Book
  async deletBook(id) {
    try {
      await axios.delete(`${REACT_APP_REST_URL}book/${id}`)
      return true
    } catch (error) {
      return error
    }
  }
}