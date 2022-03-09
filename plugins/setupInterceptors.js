import api from './api'
import TokenService from './token.service'

export default ({ store }) => {
  api.interceptors.request.use(
    (config) => {
      const token = TokenService.getLocalAccessToken()
      if (token) {
        config.headers['x-access-token'] = token // for Node.js Express back-end
      }
      // eslint-disable-next-line no-console
      console.log(config)
      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )

  api.interceptors.response.use(
    (res) => {
      return res
    },
    async (err) => {
      const originalConfig = err.config
      // eslint-disable-next-line no-console
      if (originalConfig.url !== '/auth/signin' && err.response) {
        // Access Token was expired
        if (err.response.status === 401 && !originalConfig._retry) {
          originalConfig._retry = true

          try {
            const rs = await api.post('/auth/refreshtoken', {
              refreshToken: TokenService.getLocalRefreshToken(),
            })

            const { accessToken } = rs.data

            store.dispatch('refreshToken', accessToken)
            TokenService.updateLocalAccessToken(accessToken)

            return api(originalConfig)
          } catch (_error) {
            return Promise.reject(_error)
          }
        }
      }

      return Promise.reject(err)
    }
  )
}
