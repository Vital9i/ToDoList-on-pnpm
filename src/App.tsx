import { useState } from 'react'
import './App.css'
import { Task, TodolistItem } from './TodolistItem'
import { v1 } from 'uuid'

export type FilterValues = 'all' | 'active' | 'completed'

export const App = () => {

    const [filter, setFilter] = useState<FilterValues>('all')

    const [tasks, setTask] = useState<Task[]>([
        { id: v1(), title: 'HTML&CSS', isDone: true },
        { id: v1(), title: 'JS', isDone: true },
        { id: v1(), title: 'ReactJS', isDone: false },
        { id: v1(), title: 'Redux', isDone: true },
        { id: v1(), title: 'Vue', isDone: false },
        { id: v1(), title: 'Angular', isDone: false },
    ])

    let filteredTasks = null

    switch (filter) {
        case 'all':
            filteredTasks = tasks
            break;
        case 'active':
            filteredTasks = tasks.filter(t => !t.isDone)
            break;
        case 'completed':
            filteredTasks = tasks.filter(t => t.isDone)
            break;
        default: filteredTasks = tasks
    }

    const deleteTask = (taskId: string) => {
        setTask(tasks.filter(t => t.id !== taskId))
    }

    const createTask = (taskTitle: string) => {
        setTask([{ id: v1(), title: taskTitle, isDone: false }, ...tasks])
    }

    const changeFilter = (filterName: FilterValues) => {
        setFilter(filterName)
    }

    const changeIsDone = (taskId: string, isDone: boolean) => {
        setTask(tasks.map((t) => (t.id === taskId ? { ...t, isDone: isDone } : t)))
    }

    return (
        <div className="app">
            <TodolistItem title={'What to learn'}
                tasks={filteredTasks}
                deleteTask={deleteTask}
                createTask={createTask}
                changeFilter={changeFilter}
                changeIsDone={changeIsDone}
            />
        </div>
    )
}

