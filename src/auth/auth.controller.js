import AuthService from './auth.service';
import { SuccessHandlerUtil } from '../utils';

export default class AuthController {
  static async login(req, res, next) {
    console.log(2222);
    try {
      console.log(2);
      const { adminname, password } = req.body;
      console.log(req.body, 'req.body');
      // console.log(req.body,555);

      const loginResult = await AuthService.login(adminname, password);
      console.log(loginResult, 87877878);
      SuccessHandlerUtil.handleAdd(res, next, loginResult);
    } catch (error) {
      console.log(error, 'er');
      next(error);
    }
  }

  static async refresh(req, res, next) {
    try {
      const { refreshToken } = req.body;
      const refreshResult = await AuthService.refresh(refreshToken);
      SuccessHandlerUtil.handleAdd(res, next, refreshResult);
    } catch (error) {
      next(error);
    }
  }
}
