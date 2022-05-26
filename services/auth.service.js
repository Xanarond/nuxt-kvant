import api from '@/services/api'
import TokenService from '@/services/token.service'

class AuthService {
  login ({ username, password }) {
    return api
      .post('/auth/signin', {
        username,
        password,
      })
      .then((response) => {
        if (response.data.accessToken) {
          TokenService.setUser(response.data)
        }

        return response.data
      })
  }

  logout () {
    TokenService.removeUser()
  }

  register (user) {
    return api.post('/auth/signup', {
      username: user.username,
      password: user.password,
      division: user.division,
      role: user.role,
    })
  }
}

export default new AuthService()
