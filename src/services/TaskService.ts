import { randomUUID } from "node:crypto"
import TaskRepository from "../repositories/TaskRepository"
import { Task } from "../models/Taks"

class TaskService {
  constructor(private tasksRepository: typeof TaskRepository) {}

  addTask(name: string) {
    const task = new Task(randomUUID(), name, false)
    this.tasksRepository.save(task)
  }

  completeTask(id: string) {
    const task = this.tasksRepository.findById(id)
    if (task) {
      task.completed = true
      this.tasksRepository.update(task)
    }
  }

  listTasks() {
    const tasks = this.tasksRepository.findall()
    if (tasks) {
      return tasks
    } else {
      return []
    }
  }
}

export default new TaskService(TaskRepository)
