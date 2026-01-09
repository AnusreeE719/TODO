import mongoose from "mongoose";
import Todo from "../models/todoSchema.js";


export const createTodo = async(req, res) => {
    const { title, description } = req.body;
    try{
        const newTodo = new Todo({
            title,
            description, 
            userId: req.user._id,
        })

        await newTodo.save()

        res.status(201).json({
            success: true,
            message: "Todo added successfully",
            newTodo,
        })
    }catch(error) {
        console.log("Something went wrong", error.message);
		res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

export const getAllTodos = async (req, res) => {
    const userId = req.user._id;

  try {
    const todoList = await Todo.find({ userId: userId }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: "All todos retrived successfully",
      todoList,
    })
  } catch (error) {
        console.log("Something went wrong", error.message);
		res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

export const updateTodo = async (req, res) => {

    const { todoId } = req.params;
    const { title, description } = req.body;

    if (!mongoose.Types.ObjectId.isValid(todoId)) {
        return res.status(400).json({
            success: false,
            message: "Invalid todoId",
        });
    }
    
    try {
        const updates = {};
        if (title !== undefined) updates.title = title;
        if (description !== undefined) updates.description = description;


        const todo = await Todo.findOneAndUpdate(
        { _id: todoId, userId: req.user._id },
        updates,
        { new: true }
        );

        if (!todo) {
        return res.status(404).json({
            success: false,
            message: "Todo not found or not authorized",
        });
        }

        res.status(200).json({
            success: true,
            message: "Todo updated successfully",
            todo
        })
        
    } catch (error) {
        console.log("Something went wrong", error.message);
		res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

export const updateTodoStatus = async (req, res) => {
    const { todoId } = req.params;
    const { status } = req.body;

    if (!mongoose.Types.ObjectId.isValid(todoId)) {
        return res.status(400).json({
            success: false,
            message: "Invalid todoId",
        });
    }

  try {
    const todo = await Todo.findOneAndUpdate(
      { _id: todoId, userId: req.user._id },
      { status },
      { new: true }
    );

    if (!todo) {
      return res.status(404).json({
        success: false,
        message: "Todo not found or not authorized",
      });
    }
    
    res.status(200).json({
      success: true,
      message: "Todo status updated successfully",
      todo
    })
  } catch (error) {
        console.log("Something went wrong", error.message);
		res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

export const deleteTodo = async (req, res) => {
    const { todoId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(todoId)) {
        return res.status(400).json({
            success: false,
            message: "Invalid todoId",
        });
    }

  try {
    const deletedTodo = await Todo.findOneAndDelete({
      _id: todoId,
      userId: req.user._id,
    });

    if (!deletedTodo) {
      return res.status(404).json({
        success: false,
        message: "Todo not found or not authorized",
      });
    }

    res.status(200).json({
      success: true,
      message: "Todo deleted successfully",
    });
  } catch (error) {
        console.log("Something went wrong", error.message);
		res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}


