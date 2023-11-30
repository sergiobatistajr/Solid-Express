import { Task } from "../models/Taks"

class TaskRepository {
  private tasks: Task[]
  constructor() {
    this.tasks = []
  }

  save(task: Task) {
    this.tasks.push(task)
  }
  update(updatedTask: Task) {
    const index = this.tasks.findIndex((task) => task.id === updatedTask.id)
    this.tasks[index] = updatedTask
  }

  findById(id: string) {
    return this.tasks.find((task) => task.id === id)
  }
  findall() {
    return this.tasks
  }
}
export default new TaskRepository()
