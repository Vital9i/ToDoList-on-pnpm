import './App.css'
import {TaskProps, TodolistItem} from './TodolistItem'
import {useState} from "react";

export type FilterValues = 'All' | 'Active' | 'Completed'

export const App = () => {

    const [filter, setFilter] = useState<FilterValues>('All')

    const [tasks1, setTask1] = useState<TaskProps[]>([
        {id: 1, title: 'HTML&CSS', isDone: true},
        {id: 2, title: 'JS', isDone: true},
        {id: 3, title: 'ReactJS', isDone: false},
        {id: 4, title: 'Redux', isDone: false},
    ])

    // const tasks2: TaskProps[] = [
    //     {id: 1, title: 'Hello world', isDone: true},
    //     {id: 2, title: 'I am Happy', isDone: false},
    //     {id: 3, title: 'Yo', isDone: false},
    //     {id: 4, title: 'Redux', isDone: false},
    // ]
    const changeFilter = (filter:FilterValues)=>{
        setFilter(filter)
    }

    let filteredTasks: TaskProps[] = tasks1

    switch (filter) {
        case 'All':
            filteredTasks = tasks1
            break;
        case 'Active':
            filteredTasks = tasks1.filter((t) => !t.isDone)
            break;
        case 'Completed':
            filteredTasks = tasks1.filter((t) => t.isDone)
            break;
        default:
            filteredTasks = tasks1
    }

    const deleteTask = (id: number) => {
        const filteredTasks = tasks1.filter((t) => t.id !== id)
        setTask1(filteredTasks)
    }

    return (
        <div className="app">
            <TodolistItem title={'What to learn'}
                          tasks={filteredTasks}
                          date={'07.01.2025'}
                          deleteTask={deleteTask}
                          changeFilter={changeFilter}

            />
            {/*<TodolistItem title={'Songs'} tasks={tasks2}/>*/}
        </div>
    )
}

