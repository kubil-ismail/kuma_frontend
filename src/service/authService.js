import axios from 'axios'

export class authService {
  async login(input) {
    try {
      const { email, password } = input
      const login = await axios.post('http://localhost:8000/auth/login', {
        email: email,
        password: password
      })
      return login
    } catch (error) {
      return error      
    }
  }

  async signUp(input) {
    try {
      const { email, password } = input
      const signUp = await axios.post('http://localhost:8000/auth/signIn', {
        email: email,
        password: password
      })
      return signUp
    } catch (error) {
      return error 
    }
  }

  async activate(input) {
    try {
      const { email, code } = input
      const activate = await axios.post('http://localhost:8000/auth/activate', {
        email: email,
        code: code
      })
      return activate
    } catch (error) {
      return 0
    }
  }
}