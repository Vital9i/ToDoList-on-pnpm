import { ChangeEvent, KeyboardEvent, useState } from "react"
import { Button } from "./Button"
import { FilterValues } from "./App"

type TodolistItemProps = {
    title: string
    tasks: Task[]
    deleteTask: (taskId: string) => void
    createTask: (taskTitle: string) => void
    changeFilter: (filterName: FilterValues) => void
    changeIsDone: (tasksId: string, isDone: boolean) => void
}

export type Task = {
    id: string
    title: string
    isDone: boolean
}

export const TodolistItem = ({ title, tasks, deleteTask, createTask, changeFilter, changeIsDone }: TodolistItemProps) => {

    const [taskTitle, setTaskTitle] = useState('')

    const createTaskHandler = () => {
        if (taskTitle.length) {
            createTask(taskTitle)
            setTaskTitle('')
        }
    }

    const changeTaskHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(event.currentTarget.value)
    }

    const createTaskHandlerOnEnter = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            createTaskHandler()
        }
    }

    // const changeIsDoneHandler = (event: ChangeEvent<HTMLInputElement>) => {
    //     changeIsDone(taskId,)
    // }

    return (
        <div>
            <h3>{title}</h3>

            <div>
                <input value={taskTitle}
                    onChange={changeTaskHandler}
                    onKeyDown={createTaskHandlerOnEnter}
                />
                <Button title={'new task'} onClick={createTaskHandler} />
            </div>

            <ul>
                {tasks.length === 0 ? (
                    <p>Тасок нет</p>
                ) : (
                    tasks.map(t => (
                        <li key={t.id}>
                            <input
                                type="checkbox"
                                checked={t.isDone}
                                onChange={(event: ChangeEvent<HTMLInputElement>) => changeIsDone(t.id,event.currentTarget.checked)}
                            />
                            <span>{t.title}</span>
                            <Button title={'X'} onClick={() => deleteTask(t.id)} />
                        </li>
                    ))
                )}
            </ul>

            <div>
                <Button title={'All'} onClick={() => changeFilter('all')} />
                <Button title={'Active'} onClick={() => changeFilter('active')} />
                <Button title={'Completed'} onClick={() => changeFilter('completed')} />
            </div>
        </div>
    )
}