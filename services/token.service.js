class TokenService {
  getLocalRefreshToken () {
    const user = JSON.parse(localStorage.getItem('user'))
    return user?.refreshToken
  }

  getLocalAccessToken () {
    const user = JSON.parse(localStorage.getItem('user'))
    return user?.accessToken
  }

  updateLocalAccessToken (token) {
    const user = JSON.parse(localStorage.getItem('user'))
    user.accessToken = token
    localStorage.setItem('user', JSON.stringify(user))
  }

  getUser () {
    return JSON.parse(localStorage.getItem('user'))
  }

  setUser (user) {
    // eslint-disable-next-line no-console
    console.log(JSON.stringify(user))
    localStorage.setItem('user', JSON.stringify(user))
  }

  removeUser () {
    localStorage.removeItem('user')
  }
}

export default new TokenService()
