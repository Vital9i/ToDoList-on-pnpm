import { ChangeEvent, KeyboardEvent, useState } from "react"
import { Button } from "./Button"
import { FilterValues } from "./App"

type TodolistItemProps = {
    title: string
    tasks: Task[]
    deleteTask: (taskId: string) => void
    createTask: (taskTitle: string) => void
    changeFilter: (filterName: FilterValues) => void
    changeIsDone: (taskId: string, isDone: boolean) => void
}

export type Task = {
    id: string
    title: string
    isDone: boolean
}

export const TodolistItem = ({ title, tasks, deleteTask, createTask, changeFilter, changeIsDone }: TodolistItemProps) => {

    const [taskTitle, setTaskTitle] = useState('')
    const [error, setError] = useState<string | null>(null)
    const [filter, setFilter] = useState<FilterValues>('all')

    const createTaskHandler = () => {
        if (taskTitle.trim()) {
            createTask(taskTitle.trim())
            setTaskTitle('')
        } else {
            setError('title is not required')
        }
    }

    const changeTaskHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(event.currentTarget.value)
        setError(null)
    }

    const createTaskHandlerOnEnter = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            createTaskHandler()
        }
    }

    const changeFilterHandler = (filterName: FilterValues) => {
        changeFilter(filterName)
        setFilter(filterName)
    }

    const changeIsDoneHandler = (taskId: string, isDone: boolean) => {
        changeIsDone(taskId, isDone)
    }

    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input
                    value={taskTitle}
                    onChange={changeTaskHandler}
                    onKeyDown={createTaskHandlerOnEnter}
                    className={error ? 'error' : ''}
                />
                <Button title={'new task'} onClick={createTaskHandler} />
                <p className={'errorMessage'}>{error}</p>
            </div>

            <ul>
                {tasks.length === 0 ? (
                    <p>Тасок нет</p>
                ) : (
                    tasks.map(t => (
                        <li key={t.id} className={t.isDone ? 'task-done' : ''}>
                            <input
                                type="checkbox"
                                checked={t.isDone}
                                onChange={(event: ChangeEvent<HTMLInputElement>) => changeIsDoneHandler(t.id, event.currentTarget.checked)}
                            />
                            <span>{t.title}</span>
                            <Button title={'X'} onClick={() => deleteTask(t.id)} />
                        </li>
                    ))
                )}
            </ul>

            <div>
                <Button title={'All'} className={ filter === 'all'? 'filterBtn-active': ''} onClick={() => changeFilterHandler('all')} />
                <Button title={'Active'} className={ filter === 'active'? 'filterBtn-active': ''} onClick={() => changeFilterHandler('active')} />
                <Button title={'Completed'} className={ filter === 'completed'? 'filterBtn-active': ''} onClick={() => changeFilterHandler('completed')} />
            </div>
        </div>
    )
}