import { v4 as uuidv4 } from 'uuid';
import config  from '../config/auth.config.js'; // Ensure this path is correct

export default (sequelize, Sequelize) => {
  const RefreshToken = sequelize.define('refresh_token', {
    token: {
      type: Sequelize.STRING,
    },
    expiryDate: {
      type: Sequelize.TIME,
    },
  });


  RefreshToken.createToken = async function (user) {
    const expiredAt = new Date();

    expiredAt.setSeconds(expiredAt.getSeconds() + config.jwtExpiration);

    const _token = uuidv4();

    const refreshToken = await this.create({
      token: _token,
      userId: user.id,
      expiryDate: expiredAt.getTime(),
    });

    return refreshToken.token;
  };

  RefreshToken.verifyExpiration = token =>
    token.expiryDate.getTime() < new Date().getTime();

  return RefreshToken;
}
