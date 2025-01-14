
import { useState, KeyboardEvent, ChangeEvent } from 'react'
import { FilteredValue } from './App'
import { Button } from './Button'

type TodolistItemProps = {
    title: string
    tasks: TaskType[]
    deleteTask: (taskId: string) => void
    changeTasks: (filterName: FilteredValue) => void
    addTask: (newTask: string) => void
}

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export const TodolistItem = ({ title, tasks, deleteTask, changeTasks, addTask }: TodolistItemProps) => {

    const [newTask, setNewTask] = useState('')

    const changeTasksHandler = (value: FilteredValue) => {
        changeTasks(value)
    }

    const addTaskHandler = () => {
        addTask(newTask)
        setNewTask('')
    }

    const onKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            addTaskHandler()
        }
    }

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => setNewTask(event.currentTarget.value)

    const mappedTasks = tasks.map(task => {
        const deleteTaskHandler = () => {
            deleteTask(task.id)
        }
        return (
            <li key={task.id}>
                <input type="checkbox" checked={task.isDone} />
                <span>{task.title}</span>
                {/* <Button title={'x'} onClickHandler={() => deleteTask(task.id)} /> */}
                {/* <button onClick={deleteTaskHandler}>x</button> */}
                <Button title={'x'} onClickHandler={deleteTaskHandler} />
            </li>)
    })

    return (
        <div>
            <h3>{title}</h3>

            <div>
                <input value={newTask}
                    onChange={onChangeHandler}
                    onKeyDown={onKeyDownHandler} />
                <Button title={'addTask'} onClickHandler={addTaskHandler} />
                <div>
                    {tasks.length === 0 ? (
                        <p>Тасок нет</p>
                    ) : (
                        <ul>
                            {mappedTasks}
                        </ul>
                    )}
                </div>
                <Button title={'All'} onClickHandler={() => changeTasksHandler('All')} />
                <Button title={'Active'} onClickHandler={() => changeTasksHandler('Active')} />
                <Button title={'Completed'} onClickHandler={() => changeTasksHandler('Completed')} />
            </div>
        </div>
    )
}




//------------


// import { useRef } from 'react'
// import { FilteredValue } from './App'
// import { Button } from './Button'

// type TodolistItemProps = {
//     title: string
//     tasks: TaskType[]
//     deleteTask: (taskId: string) => void
//     changeTasks: (filterName: FilteredValue) => void
//     addTask: (newTask: string) => void
// }

// type TaskType = {
//     id: string
//     title: string
//     isDone: boolean
// }

// export const TodolistItem = ({ title, tasks, deleteTask, changeTasks, addTask }: TodolistItemProps) => {

//     const inputRef = useRef<HTMLInputElement>(null)

//     console.log(inputRef)
//     return (
//         <div>
//             <h3>{title}</h3>
//             <div>
//                 <input ref={inputRef} />

//                 <Button title={'addTask'} onClickHandler={() => {
//                     if (inputRef.current) {
//                         addTask(inputRef.current.value)
//                         inputRef.current.value = ''
//                     }
//                 }} />
//             </div>
//             <ul>

//                 {tasks.length === 0 ? (<p>Тасок нет</p>) : (
//                     tasks.map(task => (
//                         <li key={task.id}>
//                             <input type="checkbox" checked={task.isDone} />
//                             <span>{task.title}</span>
//                             <Button title={'x'} onClickHandler={() => deleteTask(task.id)} />
//                         </li>
//                     ))
//                 )}

//             </ul>
//             <div>
//                 <Button title={'All'} onClickHandler={() => changeTasks('All')} />
//                 <Button title={'Active'} onClickHandler={() => changeTasks('Active')} />
//                 <Button title={'Completed'} onClickHandler={() => changeTasks('Completed')} />
//             </div>
//         </div>
//     )
// }






