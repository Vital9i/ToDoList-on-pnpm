import { useState } from 'react'
import './App.css'
import { Task, TodolistItem } from './TodolistItem'
import { v1 } from 'uuid'

export type FilterValues = 'all' | 'active' | 'completed'

export type Todolist = {
    id: string
    title: string
    filter: FilterValues
}

export type TasksState = {
    [key: string]: Task[]
}

export const App = () => {

    const todolistId1 = v1()
    const todolistId2 = v1()

    const [todolists, setTodolists] = useState<Todolist[]>([
        { id: todolistId1, title: 'What to learn', filter: 'all' },
        { id: todolistId2, title: 'What to buy', filter: 'all' },
    ])

    const [tasks, setTasks] = useState<TasksState>({
        [todolistId1]: [
            { id: v1(), title: 'HTML&CSS', isDone: true },
            { id: v1(), title: 'JS', isDone: true },
            { id: v1(), title: 'ReactJS', isDone: false },
            { id: v1(), title: 'Redux', isDone: true },
            { id: v1(), title: 'Vue', isDone: false },
            { id: v1(), title: 'Angular', isDone: false },
        ],
        [todolistId2]: [
            { id: v1(), title: 'Rest API', isDone: true },
            { id: v1(), title: 'GraphQL', isDone: false },
            { id: v1(), title: 'StyledComponents', isDone: true },
            { id: v1(), title: 'PHP', isDone: false },
            { id: v1(), title: 'NextJS', isDone: true },
            { id: v1(), title: 'NodeJS', isDone: false },
        ],
        [todolistId2]: [
            { id: v1(), title: 'Rest API', isDone: true },
            { id: v1(), title: 'GraphQL', isDone: false },
            { id: v1(), title: 'StyledComponents', isDone: true },
            { id: v1(), title: 'PHP', isDone: false },
            { id: v1(), title: 'NextJS', isDone: true },
            { id: v1(), title: 'NodeJS', isDone: false },
        ],
    })

    const deleteTask = (todoListId: string, taskId: string) => {
        setTasks({ ...tasks, [todoListId]: tasks[todoListId].filter(t => t.id !== taskId) })
    }

    const createTask = (todoListId: string, taskTitle: string) => {
        setTasks({ ...tasks, [todoListId]: [{ id: v1(), title: taskTitle, isDone: false }, ...tasks[todoListId]] })
    }

    const changeFilter = (todoListId: string, filterName: FilterValues) => {
        setTodolists(todolists.map(el => el.id === todoListId ? { ...el, filter: filterName } : el))
        console.log(todoListId)
    }

    const changeIsDone = (todoListId: string, taskId: string, isDone: boolean) => {
        setTasks({ ...tasks, [todoListId]: tasks[todoListId].map(el => el.id === taskId ? { ...el, isDone: isDone } : el) })
    }

    const deleteTodoList = (todoListId: string) => {
        setTodolists(todolists.filter(el => el.id !== todoListId))
        delete tasks[todoListId]
        setTasks({ ...tasks })
        console.log(tasks)
    }

    return (
        <div className="app">
            {todolists.map(el => {

                let filteredTasks = tasks[el.id]

                switch (el.filter) {
                    case 'all':
                        filteredTasks = tasks[el.id]
                        break;
                    case 'active':
                        filteredTasks = tasks[el.id].filter(t => !t.isDone)
                        break;
                    case 'completed':
                        filteredTasks = tasks[el.id].filter(t => t.isDone)
                        break;
                    default: filteredTasks = tasks[el.id]
                }
                return (
                    <TodolistItem
                        key={el.id}
                        todolist={el}
                        tasks={filteredTasks}
                        deleteTask={deleteTask}
                        createTask={createTask}
                        changeFilter={changeFilter}
                        changeIsDone={changeIsDone}
                        deleteTodoList={deleteTodoList}
                    />
                )
            })}

        </div>
    )
}

