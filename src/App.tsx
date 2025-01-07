import './App.css'
import {TodolistItem} from './TodolistItem'

export const App =()  => {
    return (
        <div className="app">
            <TodolistItem />
            <TodolistItem />
            <TodolistItem />
        </div>
    )
}

