import express from "express";
import { createTodoValidation, updateStatusValidation, updateTodoValidation } from "../validators/todoValidators.js";
import { createTodo, deleteTodo, getAllTodos, updateTodo, updateTodoStatus } from "../controllers/todoController.js";
import { validate } from "../middlewares/validate.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";


const router = express.Router();

router.post("/", authMiddleware, createTodoValidation, validate, createTodo);

router.get("/",authMiddleware, getAllTodos);

router.put("/:todoId", authMiddleware, updateTodoValidation, validate, updateTodo);

router.put("/status/:todoId", authMiddleware, updateStatusValidation, validate, updateTodoStatus);

router.delete("/:todoId", authMiddleware, deleteTodo);

export default router;