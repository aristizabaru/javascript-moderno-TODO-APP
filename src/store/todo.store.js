import { Todo } from "../todos/models/todo.model"

const filters = {
    all: 'all',
    completed: 'completed',
    pending: 'pending'
}

const state = {
    todos: [
        new Todo('Piedra del alma'),
        new Todo('Piedra del infinito'),
        new Todo('Piedra del tiempo'),
        new Todo('Piedra del poder'),
        new Todo('Piedra del realidad'),
    ],
    filter: filters.all
}

const initStore = () => {
    console.log(state)
    console.log('InitStore')
}

const loadStore = () => {
    throw new Error('Not implemented')
}

/**
 * 
 * @param {String} filter 
 */
const getTodos = (filter = filters.all) => {

    switch (filter) {
        case filters.all:
            return [...state.todos] // se desestructura para evitar pasar la referencia del objeto

        case filters.completed:
            return state.todos.filter(todo => todo.done)

        case filters.pending:
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
}

/**
 * 
 * @param {String} todoId 
 */
const toggleTodo = (todoId) => {
    if (!todoId) throw new Error('Id is required')

    const todoIndex = state.todos.findIndex(todo => todo.id === todoId)
    state.todos[todoIndex].done = !state.todos[todoIndex].done
}

/**
 * 
 * @param {String} todoId 
 */
const deleteTodo = (todoId) => {
    if (!todoId) throw new Error('Id is required')

    state.todos = state.todos.filter(todo => todo.id !== todoId)
}


const deleteCompleted = () => {
    state.todos = state.todos.filter(todo => todo.done)
}

/**
 * 
 * @param {filters} newFilter 
 */
const setFilter = (newFilter = filters.all) => {
    if (!Object.values(filters).includes(newFilter)) throw new Error('Invalid filter')

    state.filter = newFilter
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