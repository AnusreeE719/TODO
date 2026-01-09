import { body, param } from "express-validator";

export const createTodoValidation = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ min: 3 })
    .withMessage("Title must be at least 3 characters"),

  body("description")
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage("Description too long"),

  body("status")
    .optional()
    .isIn(["in-progress", "completed"])
    .withMessage("Invalid status"),
];

export const updateStatusValidation = [
  param("todoId").isMongoId().withMessage("Invalid todoId"),

  body("status")
    .notEmpty()
    .isIn(["in-progress", "completed"])
    .withMessage("Invalid status"),
];

export const updateTodoValidation = [
  param("todoId")
    .isMongoId()
    .withMessage("Invalid todo ID"),

  body("title")
    .optional()
    .trim()
    .isLength({ min: 3 })
    .withMessage("Title must be at least 3 characters"),

  body("description")
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage("Description too long"),

  body("status")
    .optional()
    .isIn(["in-progress", "completed"])
    .withMessage("Invalid status"),
];
