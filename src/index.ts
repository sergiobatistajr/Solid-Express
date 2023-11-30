import express from "express"
import TaskController from "./controllers/TaskController"
import UserController from "./controllers/UserController"
import { authMiddleware as auth } from "./middleware"
const app = express()
app.use(express.json())

app.post("/register", (req, res) => UserController.postRegister(req, res))
app.post("/login", (req, res) => UserController.postLogin(req, res))
app.post("/tasks", auth, (req, res) => TaskController.postTask(req, res))
app.put("/tasks/:id", auth, (req, res) => TaskController.putTask(req, res))
app.get("/tasks", auth, (req, res) => TaskController.getTasks(req, res))

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
