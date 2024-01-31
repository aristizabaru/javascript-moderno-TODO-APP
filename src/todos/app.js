import todoStore, { Filters } from '../store/todo.store'
import html from './app.html?raw'
import { renderPending, renderTodos } from './use-cases'

const ElementIds = {
    ClearCompleted: '.clear-completed',
    TodoList: '.todo-list',
    NewTodoInput: '#new-todo-input',
    TodoFilters: '.filtro',
    PedingCount: '#pending-count'
}

/**
 * 
 * @param {String} elementId 
 */
export const App = (elementId) => {

    const displayTodos = () => {
        const todos = todoStore.getTodos(todoStore.getCurrentFilter())
        renderTodos(ElementIds.TodoList, todos)
        updatePendingCount()
    }

    const updatePendingCount = () => {
        renderPending(ElementIds.PedingCount)
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
    const filtersLi = document.querySelectorAll(ElementIds.TodoFilters)

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

    filtersLi.forEach(element => {
        element.addEventListener('click', (event) => {
            filtersLi.forEach(element => element.classList.remove('selected'))
            event.target.classList.add('selected')

            switch (event.target.innerText) {
                case 'Todos':
                    todoStore.setFilter(Filters.All)
                    break
                case 'Pendientes':
                    todoStore.setFilter(Filters.Pending)
                    break
                case 'Completados':
                    todoStore.setFilter(Filters.Completed)
                    break
                default:
                    todoStore.setFilter(Filters.All)
                    break
            }

            displayTodos()

        })
    })

}