import axios from 'axios'
import store from 'store2'
const { REACT_APP_REST_URL } = process.env

export class profileService {
  // Get Profile Detail
  async getProfile(param) {
    const config = {
      headers: {
        'Authorization': store('apikey')
      }
    }

    const result = await axios.get(`${REACT_APP_REST_URL}profile/${param.id}`, config)
    const { data } = result
    return data
  }

  // Update Profile
  async updateProfile(id, param) {
    const { name, bio } = param
    const config = {
      headers: {
        'Authorization': store('apikey')
      }
    }
    const result = await axios.patch(`${REACT_APP_REST_URL}profile/${id}`, {
      fullname: name,
      bio: bio
    }, config)
    const { data } = result
    return data
  }

  // Update social media
  async updateSosmed(id, param) {
    const { facebook, twitter, instagram } = param
    const config = {
      headers: {
        'Authorization': store('apikey')
      }
    }
    const result = await axios.patch(`${REACT_APP_REST_URL}sosmed/${id}`, {
      facebook: facebook,
      twitter: twitter,
      instagram: instagram
    }, config)
    const { data } = result
    return data
  }

  // Get Favotire book
  async getFavorite(param) {
    const config = {
      headers: {
        'Authorization': store('apikey')
      }
    }
    const result = await axios.get(`${REACT_APP_REST_URL}profile/favorite/${param.id}`, config)
    const { data } = result
    return data
  }

  // Add Favorite Book
  async addFavorite(param) {
    const config = {
      headers: {
        'Authorization': store('apikey')
      }
    }
    const addFavorite = await axios.post(`${REACT_APP_REST_URL}favorite`, {
      book_id: param.bookId,
      user_id: param.id
    }, config)

    return addFavorite
  }

  // Delete Favorite book
  async deleteFavorite(param) {
    const config = {
      headers: {
        'Authorization': store('apikey')
      }
    }
    const deleteFavorite = await axios.delete(`${REACT_APP_REST_URL}favorite/${param.id}`, config)
    return deleteFavorite
  }
}