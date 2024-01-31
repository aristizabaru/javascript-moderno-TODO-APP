import todoStore from '../store/todo.store'
import html from './app.html?raw'
import { renderTodos } from './use-cases'

const ElementIds = {
    ClearCompleted: '.clear-completed',
    TodoList: '.todo-list',
    NewTodoInput: '#new-todo-input'
}

/**
 * 
 * @param {String} elementId 
 */
export const App = (elementId) => {

    const displayTodos = () => {
        const todos = todoStore.getTodos(todoStore.getCurrentFilter())
        renderTodos(ElementIds.TodoList, todos)
    }

    (() => {
        const app = document.createElement('div')
        app.innerHTML = html
        document.querySelector(elementId).append(app)

        displayTodos()
    })()

    // Referencias HTML
    const clearCompletedBtn = document.querySelector(ElementIds.ClearCompleted)
    const newDescriptionInput = document.querySelector(ElementIds.NewTodoInput)
    const todoListUl = document.querySelector(ElementIds.TodoList)

    // Listeners
    newDescriptionInput.addEventListener('keyup', (event) => {
        if (event.keyCode !== 13) return
        if (event.target.value.trim().length === 0) return

        todoStore.addTodo(event.target.value)
        event.target.value = ''
        displayTodos()
    })

    todoListUl.addEventListener('click', (event) => {
        const element = event.target.closest('[data-id]')
        const id = element.getAttribute('data-id')

        todoStore.toggleTodo(id)
        displayTodos()
    })

    todoListUl.addEventListener('click', (event) => {
        const isDestroyElement = event.target.className === 'destroy'
        const element = event.target.closest('[data-id]')

        if (!element || !isDestroyElement) return

        const id = element.getAttribute('data-id')

        todoStore.deleteTodo(id)
        displayTodos()
    })

    clearCompletedBtn.addEventListener('click', (event) => {
        todoStore.deleteCompleted()
        displayTodos()
    })

}