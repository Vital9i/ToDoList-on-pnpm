import { useState } from 'react'
import './App.css'
import { Task, TodolistItem } from './TodolistItem'
import { v1 } from 'uuid'

export type FilterValues = 'All' | 'Active' | 'Completed'

export const App = () => {

    const [filter, setFilter] = useState<FilterValues>('All')

    const [tasks, setTasks] = useState<Task[]>([
        { id: v1(), title: 'HTML&CSS', isDone: true },
        { id: v1(), title: 'JS', isDone: true },
        { id: v1(), title: 'ReactJS', isDone: false },
        { id: v1(), title: 'Redux', isDone: true },
        { id: v1(), title: 'Angular', isDone: true },
        { id: v1(), title: 'Vue', isDone: false },
    ])

    let filteredTask = tasks

    switch (filter) {
        case 'Active':
            filteredTask = tasks.filter(t => !t.isDone)
            break;
        case 'Completed':
            filteredTask = tasks.filter(t => t.isDone)
            break;
    }

    const deleteTask = (taskId: string) => {
        setTasks(tasks.filter(t => t.id !== taskId))
    }

    const filterTasks = (taskValue: FilterValues) => {
        setFilter(taskValue)
    }

    const addTask = (newTaskTitle: string) => {
        setTasks([{ id: v1(), title: newTaskTitle, isDone: false }, ...tasks])
    }

    const changeIsDone = (taskId: string, isDone: boolean) => {
        setTasks(tasks.map((t) => (t.id === taskId ? { ...t, isDone: isDone } : t)))
    }

    return (
        <div className="app">
            <TodolistItem title={'What to learn'}
                tasks={filteredTask}
                filter={filter}
                deleteTask={deleteTask}
                filterTasks={filterTasks}
                addTask={addTask}
                changeIsDone={changeIsDone}
                            />
        </div>
    )
}

export default App