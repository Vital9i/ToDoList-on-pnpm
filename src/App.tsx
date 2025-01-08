import './App.css'
import {TaskProps, TodolistItem} from './TodolistItem.tsx'
import {useState} from "react";

export type FilteredValue = 'All' | 'Active' | 'Completed';

export const App = () => {

    const [tasks1, setTask1] = useState<TaskProps[]>([
        {id: 1, title: 'HTML&CSS', isDone: true},
        {id: 2, title: 'JS', isDone: true},
        {id: 3, title: 'ReactJS', isDone: false},
        {id: 4, title: 'Redux', isDone: true},
        {id: 5, title: 'Angular', isDone: true},
        {id: 6, title: 'Vue', isDone: false},
    ])

    let filteredTasks = tasks1

    const [filter, setFilter] = useState<FilteredValue>('All');

    switch (filter) {
        case 'All':
        filteredTasks = tasks1
            break;
        case 'Active':
            filteredTasks = (tasks1.filter((t) => !t.isDone))
            break;
        case 'Completed':
            filteredTasks = (tasks1.filter((t) => t.isDone))
    }

    const changeTasks= (filter:FilteredValue)=>{
        setFilter(filter)
    }

    const deleteTask = (taskId: number) => {
        setTask1(tasks1.filter((t) => t.id !== taskId))
    }

    return (
        <div className="app">
            <TodolistItem title={'What to learn'}
                          tasks={filteredTasks}
                          deleteTask={deleteTask}
                          changeTasks={changeTasks}
            />
        </div>
    )
}

