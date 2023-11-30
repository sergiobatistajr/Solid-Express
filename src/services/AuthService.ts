import jwt from "jsonwebtoken"

class AuthService {
  generateToken(payload: object) {
    return jwt.sign(payload, "your-secret-key")
  }

  verifyToken(token: string) {
    try {
      return jwt.verify(token, "your-secret-key")
    } catch (e) {
      return null
    }
  }
}

export default new AuthService()
