import { ChangeEvent, KeyboardEvent, useState } from "react"
import { Button } from "./Button"
import { FilterValues, Todolist } from "./App"

type TodolistItemProps = {
    todolist:Todolist
    tasks: Task[]
    deleteTask: (todoListId:string,taskId: string) => void
    createTask: (todoListId:string,taskTitle: string) => void
    changeFilter: (todoListId:string,filterName: FilterValues) => void
    changeIsDone: (todoListId: string,taskId: string, isDone: boolean) => void
    deleteTodoList: (todoListId:string) => void
}

export type Task = {
    id: string
    title: string
    isDone: boolean
}

export const TodolistItem = ({ todolist:{id,title,filter},tasks, deleteTask, createTask, changeFilter, changeIsDone,deleteTodoList }: TodolistItemProps) => {

    const [taskTitle, setTaskTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const createTaskHandler = () => {
        if (taskTitle.trim()) {
            createTask(id,taskTitle.trim())
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
        changeFilter(id,filterName)
        // setFilter(filterName)
    }

    const changeIsDoneHandler = (taskId: string, isDone: boolean) => {
        changeIsDone(id,taskId, isDone)
    }

    const deleteTodoListHandler = () => {
        deleteTodoList(id)
    }

    return (
        <div>
            <h3>{title}</h3>
            <Button title={'X'} onClick={deleteTodoListHandler}/>
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
                            <Button title={'X'} onClick={() => deleteTask(id,t.id)} />
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