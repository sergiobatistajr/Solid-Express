import { User } from "../models/User"

class UserRepository {
  private users: User[]

  constructor() {
    this.users = []
  }

  save(user: User) {
    this.users.push(user)
  }

  findByEmail(email: string) {
    return this.users.find((user) => user.email === email)
  }

  findById(id: string) {
    return this.users.find((user) => user.id === id)
  }
}

export default new UserRepository()
