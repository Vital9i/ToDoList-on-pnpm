import { useState } from 'react'
import { FilteredValue } from './App'
import { Button } from './Button'

type TodolistItemProps = {
    title: string
    tasks: TaskType[]
    deleteTask: (taskId: string) => void
    changeTasks: (filterName: FilteredValue) => void
    createTask: (title: string) => void
}

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export const TodolistItem = ({ title, tasks, deleteTask, changeTasks, createTask }: TodolistItemProps) => {

    const [taskTitle, setTaskTitle] = useState('')

    const createTaskHandler = () => {
        createTask(taskTitle)
        setTaskTitle('')
    }

    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input value={taskTitle}
                    onChange={event => setTaskTitle(event.currentTarget.value)}
                    onKeyDown={event => {
                        if (event.key === 'Enter') {
                            createTaskHandler()
                        }
                    }} />

                <Button title={'+'} onClickHandler={createTaskHandler} />
            </div>
            <ul>

                {tasks.length === 0 ? (<p>Тасок нет</p>) : (
                    tasks.map(task => (
                        <li key={task.id}>
                            <input type="checkbox" checked={task.isDone} />
                            <span>{task.title}</span>
                            <Button title={'x'} onClickHandler={() => deleteTask(task.id)} />
                        </li>
                    ))
                )}

            </ul>
            <div>
                <Button title={'All'} onClickHandler={() => changeTasks('All')} />
                <Button title={'Active'} onClickHandler={() => changeTasks('Active')} />
                <Button title={'Completed'} onClickHandler={() => changeTasks('Completed')} />
            </div>
        </div>
    )
}