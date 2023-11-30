import { Request, Response } from "express"
import UserService from "../services/UserService"
import AuthService from "../services/AuthService"

class UserController {
  constructor(private userService: typeof UserService) {}

  postLogin(req: Request, res: Response) {
    const { email, password } = req.body
    try {
      const id = this.userService.loginUser({ email, password })
      const token = AuthService.generateToken(id)
      res.status(200).send(token).end()
    } catch (error) {
      if (error instanceof Error) {
        res.status(401).send(error.message).end()
      }
    }
  }
  postRegister(req: Request, res: Response) {
    const { name, email, password } = req.body
    this.userService.registerUser({ name, email, password })
    res.status(200).end()
  }
}

export default new UserController(UserService)
