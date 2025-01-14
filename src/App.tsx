import { useState } from 'react'
import './App.css'
import { TodolistItem } from './TodolistItem'
import { v1 } from 'uuid'


export type FilteredValue = 'All' | 'Active' | 'Completed'

export const App = () => {
    const [tasks1, setTasks] = useState([
        { id: v1(), title: 'HTML&CSS', isDone: true },
        { id: v1(), title: 'JS', isDone: true },
        { id: v1(), title: 'ReactJS', isDone: false },
        { id: v1(), title: 'Redux', isDone: true },
        { id: v1(), title: 'Angular', isDone: true },
        { id: v1(), title: 'Vue', isDone: false },
    ])


    let filteredTasks

    const [filter, setFilter] = useState<FilteredValue>('All')

    const changeTasks = (filterName: FilteredValue) => {
        setFilter(filterName)
    }

    const deleteTask = (taskId: string) => {
        setTasks(tasks1.filter((t) => (t.id !== taskId)))
    }

    const addTask = (newTask: string) => {
        setTasks([{ id: v1(), title: newTask, isDone: false }, ...tasks1])
    }


    switch (filter) {
        case 'All':
            filteredTasks = tasks1;
            break
        case 'Active':
            filteredTasks = tasks1.filter((t) => !t.isDone)
            break
        case 'Completed':
            filteredTasks = tasks1.filter((t) => t.isDone)
            break
    }

    return (
        <div className="app">
            <TodolistItem title={'What to learn'}
                tasks={filteredTasks}
                deleteTask={deleteTask}
                changeTasks={changeTasks}
                addTask={addTask}
            />
        </div>
    )
}

