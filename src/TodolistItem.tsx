import { useState, KeyboardEvent } from "react"
import { FilterValues } from "./App"
import { Button } from "./Button"


type TodolistItemProps = {
    title: string
    tasks: Task[]
    filter: FilterValues
    deleteTask: (taskId: string) => void
    filterTasks: (taskValue: FilterValues) => void
    addTask: (newTaskTitle: string) => void
  }

export type Task = {
    id: string
    title: string
    isDone: boolean
}

export const TodolistItem = (props: TodolistItemProps) => {

    const { title, tasks, deleteTask, filterTasks, addTask} = props

    const [newTask, setNewTask] = useState('')

    const deleteTaskHandler = (taskId: string) => {
        deleteTask(taskId)
    }

    const filterTasksHandler = (taskValue: FilterValues) => {
        filterTasks(taskValue)
    }

    const createTaskOnEnterHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            addTaskHandler()
        }
    }

    const changeInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewTask(event.currentTarget.value);
        setError(null)
    };

    const addTaskHandler = () => {
        const trimmedNewTask = newTask.trim()
        if (trimmedNewTask.trim() !== '') {
            addTask(trimmedNewTask)
            setNewTask('')
        } else {
            setError('Title is required')
        }
    }

    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input
                                value={newTask}
                    onChange={changeInputHandler}
                    onKeyDown={createTaskOnEnterHandler} />
                <Button title={'add task'} onClickHandler={addTaskHandler} />
            </div>
            <ul>
                {tasks.length === 0 ? (
                    <p>Тасок нет</p>
                ) : (
                    tasks.map((t) => (
                        <li key={t.id}>
                            <input type="checkbox" checked={t.isDone}/>
                            <span>{t.title}</span>
                            <Button title={'X'} onClickHandler={() => deleteTaskHandler(t.id)} />
                        </li>
                    ))
                )}
            </ul>
            <div>
                <Button
                    title={'All'}
                    onClickHandler={() => filterTasksHandler('All')} />

                <Button
                    title={'Active'}
                    onClickHandler={() => filterTasksHandler('Active')} />

                <Button
                    title={'Completed'}
                    onClickHandler={() => filterTasksHandler('Completed')} />
            </div>
        </div>
    )
}