import AuthService from '@/services/auth.service'

// const user = JSON.parse(localStorage.getItem('user'));
const user = ''
export const state = () =>
  user
    ? { status: { loggedIn: true }, user }
    : { status: { loggedIn: false }, user: null }

export const actions = {
  login({ commit }, user) {
    return AuthService.login(user).then(
      user => {
        commit('loginSuccess', user)
        return Promise.resolve(user)
      },
      error => {
        commit('loginFailure')
        return Promise.reject(error)
      },
    )
  },
  logout({ commit }) {
    AuthService.logout()
    commit('logout')
  },
  refreshToken({ commit }, accessToken) {
    commit('refreshToken', accessToken)
  },

  register({ commit }, user) {
    return AuthService.register(user).then(
      response => {
        commit('registerSuccess')
        return Promise.resolve(response.data)
      },
      error => {
        commit('registerFailure')
        return Promise.reject(error)
      },
    )
  },
}

export const mutations = {
  loginSuccess(state, user) {
    state.status.loggedIn = true
    state.user = user
  },
  loginFailure(state) {
    state.status.loggedIn = false
    state.user = null
  },
  logout(state) {
    state.status.loggedIn = false
    state.user = null
  },
  refreshToken(state, accessToken) {
    state.status.loggedIn = true
    state.user = { ...state.user, accessToken }
  },
  registerSuccess(state) {
    state.status.loggedIn = false
  },
  registerFailure(state) {
    state.status.loggedIn = false
  },
}
