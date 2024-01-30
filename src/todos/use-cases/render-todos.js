import { Todo } from "../models/todo.model"
import { createTodoHTML } from "./create-todo-html"

let element

/**
 * 
 * @param {String} elementId 
 * @param {Array<Todo>} todos
 */
export const renderTodos = (elementId, todos = []) => {

    // Solo se guarda una vez la referencia del DOM para mejorar rendimiento
    if (!element) element = document.querySelector(elementId)
    if (!element) throw new Error(`Element ${elementId} not found`)

    element.innerHTML = ''
    todos.forEach(todo => element.append(createTodoHTML(todo)))
}