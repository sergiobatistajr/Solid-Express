import { Request, Response } from "express"
import TaskService from "../services/TaskService"

class TaskController {
  constructor(private readonly taskService: typeof TaskService) {}

  getTasks(req: Request, res: Response) {
    const tasks = this.taskService.listTasks()
    res.status(200).send(tasks)
  }

  postTask(req: Request, res: Response) {
    const { name } = req.body
    this.taskService.addTask(name)
    res.status(201).send()
  }

  putTask(req: Request, res: Response) {
    const { id } = req.params
    this.taskService.completeTask(id)
    res.status(200).send()
  }
}
export default new TaskController(TaskService)
