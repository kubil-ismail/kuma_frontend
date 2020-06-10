import axios from 'axios'
const { REACT_APP_REST_URL } = process.env

export class authService {
  async login(input) {
    try {
      const { email, password } = input
      const login = await axios.post(`${REACT_APP_REST_URL}auth/login`, {
        email: email,
        password: password
      })
      return login
    } catch (error) {
      return error.response      
    }
  }

  async signUp(input) {
    try {
      const { email, password } = input
      const signUp = await axios.post(`${REACT_APP_REST_URL}auth/signIn`, {
        email: email,
        password: password
      })
      return signUp
    } catch (error) {
      return error.response 
    }
  }

  async activate(input) {
    try {
      const { email, code } = input
      const activate = await axios.post(`${REACT_APP_REST_URL}auth/activate`, {
        email: email,
        code: code
      })
      return activate
    } catch (error) {
      return 0
    }
  }
}