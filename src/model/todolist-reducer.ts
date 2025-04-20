import {FilterValues, Todolist} from "../App.tsx";

const initializationState: Todolist[] = []

export  type ActionType = DeleteTodolistActon |
    createTodolist |
    changeTodolistTitle |
    changeTodolistFilter

export type DeleteTodolistActon = ReturnType<typeof deleteTodolistAC>
export type createTodolist = ReturnType<typeof createTodolistAC>
export type changeTodolistTitle = ReturnType<typeof changeTodolistTitleAC>
export type changeTodolistFilter = ReturnType<typeof changeTodolistFilterAC>

export const todolistReducer = (state: Todolist[] = initializationState, action: ActionType): Todolist[] => {
    switch (action.type) {
        case "delete_todolist": {
            return state.filter(el => el.id !== action.payload.id)
        }
        case 'create_todolist': {
            const newTodolist:Todolist = {id: action.payload.id, title: action.payload.title, filter: 'all'}
            return [...state, newTodolist]
        }
        case 'change_todolist_title': {
            return state.map(tl => tl.id === action.payload.id ? {...tl, title: action.payload.title} : tl)
        }
        case 'change_todolist_filter': {
            return state.map(el => el.id === action.payload.id ? {...el, filter: action.payload.filter} : el)
        }
        default:
            return state
    }
}

export const deleteTodolistAC = (id: string) => {
    return {type: 'delete_todolist', payload: {id}} as const
}
export const createTodolistAC = (id: string,title: string) => {
    return {type: 'create_todolist', payload: {id,title}} as const
}
export const changeTodolistTitleAC = ({id,title}:{id: string, title: string}) => {
    return {type: 'change_todolist_title', payload: {id, title}} as const
}
export const changeTodolistFilterAC = ({id,filter}:{id: string,filter: FilterValues}) => {
    return {type: 'change_todolist_filter', payload: {id,filter}} as const
}


