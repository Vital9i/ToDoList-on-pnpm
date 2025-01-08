import './App.css'
import {TodolistItem} from './TodolistItem.tsx'
import {useState} from "react";

export const App = () => {

    const [tasks1, setTask1] = useState([
        {id: 1, title: 'HTML&CSS', isDone: true},
        {id: 2, title: 'JS', isDone: true},
        {id: 3, title: 'ReactJS', isDone: false},
        {id: 4, title: 'Redux', isDone: true},
        {id: 5, title: 'Angular', isDone: true},
        {id: 6, title: 'Vue', isDone: false},
    ])

    // const tasks2 = [
    //     {id: 1.1, title: 'Hello world', isDone: true},
    //     {id: 2.2, title: 'I am Happy', isDone: false},
    //     {id: 3.3, title: 'Yo', isDone: false},
    // ]

    const deleteTask = (taskId: number) => {
        setTask1(tasks1.filter((t) => t.id !== taskId))
    }

    return (
        <div className="app">
            <TodolistItem title={'What to learn'}
                          tasks={tasks1}
                          deleteTask={deleteTask}
            />
            {/*<TodolistItem title={'Songs'}*/}
            {/*              tasks={tasks2}*/}
            {/*/>*/}
        </div>
    )
}

