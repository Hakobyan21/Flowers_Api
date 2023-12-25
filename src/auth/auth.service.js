import jwt from 'jsonwebtoken';
import { UsersModel } from '../models';
import { ErrorsUtil, CryptoUtil } from '../utils';

import config from '../config/variables.config';

const { AUTH } = config;

const {
  JWT_ACCESS_SECRET,
  JWT_REFRESH_SECRET,
  ACCESS_TOKEN_ACTIVE_TIME,
  REFRESH_TOKEN_ACTIVE_TIME
} = AUTH;

const { InputValidationError, UnauthorizedError } = ErrorsUtil;
export default class AuthService {
  static generateTokens(payload) {
    const accessToken = jwt.sign(payload, JWT_ACCESS_SECRET, { expiresIn: ACCESS_TOKEN_ACTIVE_TIME });
    const refreshToken = jwt.sign(payload, JWT_REFRESH_SECRET, { expiresIn: REFRESH_TOKEN_ACTIVE_TIME });

    return { accessToken, refreshToken };
  }

  static validateAccessToken(accessToken) {
    try {
      return jwt.verify(accessToken, JWT_ACCESS_SECRET);
    } catch (error) {
      if (error) {
        if (error.name === 'TokenExpiredError') {
          throw new UnauthorizedError('Token has expired');
        } else {
          throw new UnauthorizedError('Token is invalid');
        }
      }
    }
  }

  static validateRefreshToken(refreshToken) {
    try {
      return jwt.verify(refreshToken, JWT_REFRESH_SECRET);
    } catch (error) {
      throw new UnauthorizedError('refresh token is not same');
    }
  }

  static async refresh(token) {
    const user = AuthService.validateRefreshToken(token);
    delete user.iat;
    delete user.exp;

    const { accessToken, refreshToken } = AuthService.generateTokens(user);

    const payload = {
      accessToken,
      refreshToken,
      ...user
    };
    return payload;
  }

  static async login(adminname, password) {
    const user = await UsersModel.findByAdminName(adminname);
    console.log(user, 'inpuesr');
    if (!user) throw new InputValidationError('Invalid adminname or password');
    if (!CryptoUtil.isValidPassword(password, user.password)) {
      throw new InputValidationError('Invalid adminname or password');
    }

    delete user.password;
    const { accessToken, refreshToken } = AuthService.generateTokens({ ...user });
    if (user.branch_address) {
      const payload = {
        id: user.id,
        users_id: user.users_id,
        branch_adress: user.branch_address,
        company_name: user.company_name,
        adminame: user.adminname,
        role: user.role,
        accessToken,
        refreshToken
      };
      console.log(payload, 'if');
      return payload;
    }

    const payload = {
      id: user.id,
      users_id: user.users_id,
      company_name: user.company_name,
      adminame: user.adminname,
      role: user.role,
      accessToken,
      refreshToken
    };
    console.log(payload,'els');
    return payload;
  }
}
