import { randomUUID } from "node:crypto"
import UserRepository from "../repositories/UserRepository"
import { User } from "../models/User"

class UserService {
  constructor(private readonly userRepository: typeof UserRepository) {}

  registerUser({
    name,
    email,
    password,
  }: {
    name: string
    email: string
    password: string
  }) {
    const user = new User(randomUUID(), name, email, password)
    this.userRepository.save(user)
  }

  loginUser({ email, password }: { email: string; password: string }) {
    const user = this.userRepository.findByEmail(email)
    if (!user) {
      throw new Error("Usuário não existe")
    }
    if (password !== user.password) {
      throw new Error("Senha inválida")
    }
    return {
      id: user.id,
    }
  }
}

export default new UserService(UserRepository)
