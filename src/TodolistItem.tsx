import { ChangeEvent, useState, KeyboardEvent } from "react"
import { FilterValues } from "./App"
import { Button } from "./Button"


type TodolistItemProps = {
    title: string
    tasks: Task[]
    filter: FilterValues
    deleteTask: (taskId: string) => void
    filterTasks: (taskValue: FilterValues) => void
    addTask: (newTaskTitle: string) => void
    changeTaskStatus: (taskId: string, newStatus: boolean) => void
}

export type Task = {
    id: string
    title: string
    isDone: boolean
}

export const TodolistItem = (props: TodolistItemProps) => {

    const { title, tasks, deleteTask, filterTasks, addTask, changeTaskStatus, filter } = props

    const [newTask, setNewTask] = useState('')
    const [error, setError] = useState<string | null>(null)

    const deleteTaskHandler = (taskId: string) => {
        deleteTask(taskId)
    }

    const filterTasksHandler = (taskValue: FilterValues) => {
        filterTasks(taskValue)
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        error && setError(null)
        setNewTask(event.currentTarget.value); // Обновляем состояние
    };

    const createTaskOnEnterHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            addTaskHandler()
        }
    }

    const addTaskHandler = () => {
        if (newTask.trim() !== '') {
            addTask(newTask)
        } else {
            setError('Title is required')
        }
        setNewTask('')
    }
    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input
                    className={error ? 'taskInputError' : ''}
                    value={newTask}
                    onChange={handleChange}
                    onKeyDown={createTaskOnEnterHandler} />
                <Button title={'add task'} onClickHandler={addTaskHandler} />
                {error && <div style={{ color: 'red' }}>{error}</div>}
            </div>
            <ul>
                {tasks.length === 0 ? (
                    <p>Тасок нет</p>
                ) : (
                    tasks.map((t) => (
                        <li key={t.id}>
                            <input
                                type="checkbox"
                                onChange={(e) => changeTaskStatus(t.id, e.currentTarget.checked)}
                                checked={t.isDone}
                            />
                            <span className={t.isDone ? 'task-done' : 'task'}>{t.title}</span>
                            <Button title={'X'} onClickHandler={() => deleteTaskHandler(t.id)} />

                        </li>
                    ))
                )}
            </ul>
            <div>
                <Button
                    classes={filter === 'All' ? 'filterBtn-active' : ''}
                    title={'All'}
                    onClickHandler={() => filterTasksHandler('All')} />

                <Button
                    classes={filter === 'Active' ? 'filterBtn-active' : ''}
                    title={'Active'}
                    onClickHandler={() => filterTasksHandler('Active')} />

                <Button
                    classes={filter === 'Completed' ? 'filterBtn-active' : ''}
                    title={'Completed'}
                    onClickHandler={() => filterTasksHandler('Completed')} />
            </div>
        </div>
    )
}