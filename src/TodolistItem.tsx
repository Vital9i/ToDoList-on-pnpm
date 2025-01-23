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
    changeIsDone: (taskId: string, isDone: boolean) => void

}

export type Task = {
    id: string
    title: string
    isDone: boolean
}

export const TodolistItem = (props: TodolistItemProps) => {

    const { title, tasks, deleteTask, filterTasks, addTask, changeIsDone, filter } = props

    const [newTask, setNewTask] = useState('')
    const [error, setError] = useState<string | null>(null)

    const filterTasksHandler = (taskValue: FilterValues) => {
        filterTasks(taskValue)
    }

    const createTaskOnEnterHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            addTaskHandler()
        }
    }

    const changeInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setError(null)
        setNewTask(event.currentTarget.value);
    }

    const addTaskHandler = () => {
        if (newTask.trim()) {
            addTask(newTask.trim())
            setNewTask('')
        } else {
            setError('title is requered')
        }
    }

    const deleteTaskHandler = (taskId: string) => {
        deleteTask(taskId);
    };

    const changeIsDoneHandler = (taskId: string, isDone: boolean) => {
        changeIsDone(taskId, isDone);
    };

    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input
                    className={error ? 'error' : ''}
                    value={newTask}
                    onChange={changeInputHandler}
                    onKeyDown={createTaskOnEnterHandler} />
                <Button title={'add task'} onClickHandler={addTaskHandler} />
                {error && <div className={'error-message'}>{error}</div>}
            </div>

            <ul>
                {tasks.length === 0 ? (
                    <p>Тасок нет</p>
                ) : (
                    tasks.map((t) => {
                        return (
                            <li key={t.id} className={t.isDone ? 'task-done' : ''}>
                                <input
                                    type="checkbox"
                                    checked={t.isDone}
                                    onChange={(event) =>changeIsDoneHandler(t.id, event.currentTarget.checked)}
                                />
                                <span>{t.title}</span>
                                <Button title={'X'} onClickHandler={() => deleteTaskHandler(t.id)} />
                            </li>
                        );
                    })
                )}
            </ul>

            <div>
                <Button
                    className={filter === 'All' ? 'filterBtn-active' : ''}
                    title={'All'}
                    onClickHandler={() => filterTasksHandler('All')} />

                <Button
                    className={filter === 'Active' ? 'filterBtn-active' : ''}
                    title={'Active'}
                    onClickHandler={() => filterTasksHandler('Active')} />

                <Button
                    className={filter === 'Completed' ? 'filterBtn-active' : ''}
                    title={'Completed'}
                    onClickHandler={() => filterTasksHandler('Completed')} />
            </div>
        </div>
    )
}