import axios from 'axios'
import store from 'store2'
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
    const { bookName, bookDesc, file, bookPublished, bookLanguage, bookGenre, bookAuthor, bookStatus } = data

    console.log(data)
    formData.append('name', bookName)
    formData.append('description', bookDesc)
    formData.append('picture', file)
    formData.append('genreId', parseInt(bookGenre.value, 10))
    formData.append('authorId', parseInt(bookAuthor.value, 10))
    formData.append('statusId', parseInt(bookStatus.value, 10))
    formData.append('published', bookPublished)
    formData.append('language', bookLanguage)

    const config = {
      headers: {
        'content-type': 'multipart/form-data',
        'Authorization': store('apikey')
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
    const { bookName, bookDesc, bookPublished, bookLanguage, bookGenre, bookAuthor, bookStatus, bookDetail } = data
    const config = {
      headers: {
        'Authorization': store('apikey')
      }
    }
    try {
      const edit = await axios.patch(`${REACT_APP_REST_URL}book/${id}`, {
        name: bookName ? bookName : bookDetail.name,
        description: bookDesc ? bookDesc : bookDetail.description,
        genre_id: bookGenre.value ? bookGenre.value : bookDetail.genre_id,
        author_id: bookAuthor.value ? bookAuthor.value : bookDetail.author_id,
        status_id: bookStatus.value ? bookStatus.value : bookDetail.status_id,
        published: bookPublished ? bookPublished : bookDetail.published,
        language: bookLanguage ? bookLanguage : bookDetail.language
      }, config)
      console.log(edit)
      return edit
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
        'content-type': 'multipart/form-data',
        'Authorization': store('apikey')
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
    const config = {
      headers: {
        'Authorization': store('apikey')
      }
    }
    try {
      await axios.delete(`${REACT_APP_REST_URL}book/${id}`, config)
      return true
    } catch (error) {
      return error
    }
  }

  // Get Author
  async getAuthor() {
    const config = {
      headers: {
        'Authorization': store('apikey')
      }
    }
    try {
      const author = axios.get(`${REACT_APP_REST_URL}author`, config)
      return author
    } catch (error) {
      return error
    }
  }
}