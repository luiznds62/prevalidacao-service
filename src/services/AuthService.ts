import * as jwt from "jsonwebtoken";
import authConfig from "../../config/auth";

export class AuthService {
  private generateToken(params = {}) {
    return jwt.sign(params, authConfig.secret, {
      expiresIn: 86400
    });
  }

  async auth(auth) {
    try {
      if (!auth.login) {
        throw new TypeError(`Login não informado`);
      }

      if (!auth.senha) {
        throw new TypeError(`Senha não informada`);
      }

      if (authConfig.user.login != auth.login) {
        throw new TypeError(`Login inválido`);
      }

      if (authConfig.user.senha != auth.senha) {
        throw new TypeError(`Senha inválida`);
      }

      return {
        token: this.generateToken({ id: Math.floor(Math.random() * 657) })
      };
    } catch (err) {
      throw new TypeError(`${err.message}`);
    }
  }
}
