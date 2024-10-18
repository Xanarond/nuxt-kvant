import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import db from '../models/index.js';
import config from '../config/auth.config.js';

const { user: User, role: Role, refreshToken: RefreshToken } = db

export const signup = (req, res) => {
  // Save User to Database
  User.create({
    username: req.body.username,
    division: req.body.division,
    password: bcrypt.hashSync(req.body.password, 8),
    role: req.body.role,
  })
    .then((user) => {
      if (req.body.role) {
        Role.findOne({
          where: {
            name: req.body.role,
          },
        }).then((roles) => {
          user.setRoles(roles).then(() => {
            res.send({ message: 'User registered successfully!' })
          })
        })
      }
      if (!req.body.username) {
        res.send({ message: 'User name is not empty' })
      }
    })
    .catch((err) => {
      res.status(500).send({ message: err.message })
    })
} 

export const signin = (req, res) => {
  User.findOne({
    where: {
      username: req.body.username,
    },
  })
    .then(async (user) => {
      if (!user) {
        return res.status(404).send({ message: 'User Not found.' })
      }

      const passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password,
      )

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: 'Invalid Password!',
        })
      }

      const token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: config.jwtExpiration,
      })

      const refreshToken = await RefreshToken.createToken(user)

      user.getRoles().then((roles) => {
        let authority
        for (let i = 0; i < roles.length; i++) {
          authority = `ROLE_${roles[i].name.toUpperCase()}`
        }

        res.status(200).send({
          id: user.id,
          username: user.username,
          division: user.division,
          role: authority,
          accessToken: token,
          refreshToken,
        })
      })
    })
    .catch((err) => {
      res.status(500).send({ message: err.message })
    })
}

export const refreshToken = async (req, res) => {
  const { refreshToken: requestToken } = req.body

  if (requestToken == null) {
    return res.status(403).redirect(`${process.env.API_HOST}/login`).json({ message: 'Refresh Token is required!' })
  }

  try {
    const refreshToken = await RefreshToken.findOne({
      where: { token: requestToken },
    })

    // console.log(refreshToken)

    if (!refreshToken) {
      res.status(403).redirect(`${process.env.API_HOST}/login`).json({ message: 'Refresh token is not in database!' })
      return
    }

    if (RefreshToken.verifyExpiration(refreshToken)) {
      RefreshToken.destroy({ where: { id: refreshToken.id } })

      res.status(403).redirect(`${process.env.API_HOST}/login`).json({
        message: 'Refresh token was expired. Please make a new signin request',
      })
      return
    }

    const user = await refreshToken.getUser()
    const newAccessToken = jwt.sign({ id: user.id }, config.secret, {
      expiresIn: config.jwtExpiration,
    })

    return res.status(200).json({
      accessToken: newAccessToken,
      refreshToken: refreshToken.token,
    })
  } catch (err) {
    return res.status(500).send({ message: err })
  }
}
