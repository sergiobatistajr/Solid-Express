import express from "express"
import { TaskController } from "./controllers/TaskController"
import { UserController } from "./controllers/UserController"
import { authMiddleware as auth } from "./middleware"
const app = express()
const taskController = new TaskController()
const userController = new UserController()
// Middleware para parsear o corpo das requisições
app.use(express.json())

// Rotas
app.post("/register", (req, res) => userController.postRegister(req, res))
app.post("/login", (req, res) => userController.postLogin(req, res))
app.post("/tasks", auth, (req, res) => taskController.postTask(req, res))
app.put("/tasks/:id", auth, (req, res) => taskController.putTask(req, res))
app.get("/tasks", auth, (req, res) => taskController.getTasks(req, res))

// Iniciar o servidor
const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
