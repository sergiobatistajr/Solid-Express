import { Request, Response } from "express"
import { UserService } from "../services/UserService"

export class UserController {
  private userService: UserService
  constructor() {
    this.userService = new UserService()
  }

  postLogin(req: Request, res: Response) {
    const { email, password } = req.body
    try {
      const output = this.userService.loginUser({ email, password })
      res.status(200).send(output).end()
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
