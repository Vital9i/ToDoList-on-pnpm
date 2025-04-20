import {TasksState} from "../App.tsx";
import {v1} from "uuid";

type ActionTasksType =
    createTodolistForTasksType |
    deleteTodoListForTasksType|
    deleteTaskType |
    createTaskType |
    changeIsDone |
    changeTaskTitle

type createTodolistForTasksType = ReturnType<typeof createTodolistForTasksAC>
type deleteTodoListForTasksType = ReturnType<typeof deleteTodoListForTasksAC>

type deleteTaskType = ReturnType<typeof deleteTaskAC>
type createTaskType = ReturnType<typeof createTaskAC>
type changeIsDone = ReturnType<typeof changeIsDoneAC>
type changeTaskTitle = ReturnType<typeof changeTaskTitleAC>

export const tasksReducer = (state: TasksState, action: ActionTasksType): TasksState => {
    switch (action.type) {
        case 'create_todolist':
            return {...state,[action.payload.tlId]: []}
        case 'delete_todolist':
            const newState = {...state}
            delete newState[action.payload.tlId]
            return newState

        case 'delete_task' :
            return {...state, [action.payload.tlId]: state[action.payload.tlId].filter(t => t.id !== action.payload.id)}
        case 'create_task' :
            const newId = v1()
            return {...state, [action.payload.tlId]: [{id: newId, title: action.payload.title, isDone: false}, ...state[action.payload.tlId]]}
        case 'change_isDone':
            return {...state, [action.payload.tlId]: state[action.payload.tlId].map(el => el.id === action.payload.id ? {...el, isDone: action.payload.isDone} : el)}
        case 'change_task_title' :
            return {...state, [action.payload.tlId]: state[action.payload.tlId].map(t => t.id === action.payload.id ? {...t, title: action.payload.title} : t)}
        default:
            return state
    }
}
export const createTodolistForTasksAC = (tlId:string) => {
    return{type:'create_todolist',payload:{tlId}} as const
}
export const deleteTodoListForTasksAC = (tlId:string) => {
    return{type:'delete_todolist',payload:{tlId}} as const
}


export const deleteTaskAC = (tlId:string,id:string) => {
    return{type:'delete_task',payload:{tlId,id}} as const
}
export const createTaskAC = (tlId:string,title:string) => {
    return {type: 'create_task',payload:{tlId,title}} as const
}
export const changeIsDoneAC = (tlId:string,id:string,isDone:boolean) => {
    return {type:'change_isDone',payload:{tlId,id,isDone}} as const
}
export const changeTaskTitleAC = (tlId:string,id:string,title:string) => {
    return {type:'change_task_title',payload:{tlId,id,title}} as const
}