import { Request, Response, NextFunction } from "express"
import AuthService from "./services/AuthService"

declare module "express-serve-static-core" {
  interface Request {
    userId?: string
  }
}
export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    return res.status(401).send({ error: "No token provided" })
  }

  const parts = authHeader.split(" ")

  if (!(parts.length === 2)) {
    return res.status(401).send({ error: "Token error" })
  }

  const [scheme, token] = parts

  if (!/^Bearer$/i.test(scheme)) {
    return res.status(401).send({ error: "Token malformatted" })
  }

  const decoded = AuthService.verifyToken(token)
  if (typeof decoded === "string" || !decoded) {
    return res.status(401).send({ error: "Invalid token" })
  }

  req.userId = decoded.id as string

  return next()
}
