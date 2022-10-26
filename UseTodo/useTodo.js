import { useReducer,useEffect } from "react"
import { todoReducer } from "./todoReducer"


const initialState = [
    // {
    //     id: new Date().getTime(),
    //     description: 'recolectar la piedra del alma',
    //     done: false
    // },
]

const init = () => {
    return JSON.parse( localStorage.getItem('todos')) || []
}

export const useTodo = () => {


    const [todos, dispatch] = useReducer( todoReducer, initialState, init)

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(  todos ))
    }, [todos])

    const handleNewTodo = ( todo ) => {
        const action = {
            type: '[TODO] Add Todo',
            payload: todo
        } 

        dispatch( action )
    }

    const handleToggleTodo = ( id ) => {
        dispatch({
            type: '[TODO] Toggle Todo',
            payload: id
        })
    }

    const handleDeleteTodo = ( id ) => {
        dispatch({
            type: '[TODO] Remove Todo',
            payload: id
        })
    }


    return {
        todos,
        handleNewTodo,
        handleDeleteTodo,
        handleToggleTodo,
        todosCount : todos.length,
        pendingTodosCount : todos.filter( todo => !todo.done).length
    }
} 