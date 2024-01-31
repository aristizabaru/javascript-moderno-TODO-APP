import { Todo } from "../todos/models/todo.model"

const Filters = {
    All: 'all',
    Completed: 'completed',
    Pending: 'pending'
}

const state = {
    todos: [
    ],
    filter: Filters.All
}

const initStore = () => {
    loadStore()
}

const loadStore = () => {

    const stateSerialized = localStorage.getItem('state')
    if (!stateSerialized) return

    const { todos = [], filter = Filters.All } = JSON.parse(stateSerialized)
    state.todos = todos
    state.filter = filter
}

const saveStateToLocalStorage = () => {
    const stateSerialized = JSON.stringify(state)
    localStorage.setItem('state', stateSerialized)
}

/**
 * 
 * @param {String} filter 
 */
const getTodos = (filter = Filters.all) => {

    switch (filter) {
        case Filters.All:
            return [...state.todos] // se desestructura para evitar pasar la referencia del objeto

        case Filters.Completed:
            return state.todos.filter(todo => todo.done)

        case Filters.Pending:
            return state.todos.filter(todo => !todo.done)

        default:
            throw new Error(`Option ${filter} is not valid`)
    }
}

/**
 * 
 * @param {String} description 
 */
const addTodo = (description) => {
    if (!description) throw new Error('Description is required')

    const newTodo = new Todo(description)
    state.todos.push(newTodo)

    saveStateToLocalStorage()
}

/**
 * 
 * @param {String} todoId 
 */
const toggleTodo = (todoId) => {
    if (!todoId) throw new Error('Id is required')

    const todoIndex = state.todos.findIndex(todo => todo.id === todoId)
    state.todos[todoIndex].done = !state.todos[todoIndex].done

    saveStateToLocalStorage()
}

/**
 * 
 * @param {String} todoId 
 */
const deleteTodo = (todoId) => {
    if (!todoId) throw new Error('Id is required')

    state.todos = state.todos.filter(todo => todo.id !== todoId)

    saveStateToLocalStorage()
}


const deleteCompleted = () => {
    state.todos = state.todos.filter(todo => !todo.done)

    saveStateToLocalStorage()
}

/**
 * 
 * @param {Filters} newFilter 
 */
const setFilter = (newFilter = Filters.All) => {
    if (!Object.values(Filters).includes(newFilter)) throw new Error('Invalid filter')

    state.filter = newFilter

    saveStateToLocalStorage()
}

const getCurrentFilter = () => {
    return state.filter
}


export default {
    addTodo,
    deleteCompleted,
    deleteTodo,
    getCurrentFilter,
    getTodos,
    initStore,
    loadStore,
    setFilter,
    toggleTodo,
}