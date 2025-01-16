
import { KeyboardEvent,ChangeEvent, useState } from 'react'
import { FilteredValue } from './App'
import { Button } from './Button'

type TodolistItemProps = {
    title: string
    tasks: TaskType[]
    deleteTask: (taskId: string) => void
    changeTasks: (filterName: FilteredValue) => void
    createTask: (titleTask: string) => void
}

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export const TodolistItem = ({ title, tasks, deleteTask, changeTasks, createTask }: TodolistItemProps) => {

    const [titleTask, setTitleTask] = useState('')

    const createTaskHandler = () => {
        if (titleTask.trim()) {
            createTask(titleTask)
            setTitleTask('')
        }
    }

    const changeTitleTaskHandler = (event:ChangeEvent<HTMLInputElement>) => {
        setTitleTask(event.currentTarget.value)
    }

    const createTaskOnEnterHandler =(event:KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            createTaskHandler()
        }
    }

    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input value={titleTask}
                    onChange={changeTitleTaskHandler}
                    onKeyDown={createTaskOnEnterHandler}
                />
                <Button title={'createTask'} onClickHandler={createTaskHandler} />
                <div>
                    {tasks.length === 0 ? (
                        <p>Тасок нет</p>
                    ) : (
                        <ul>
                            {tasks.map(task => {
                                    const deleteTaskHandler = ()=>{
                                        deleteTask(task.id)
                                    }
                                return (
                                    <li key={task.id}>
                                        <input type="checkbox" checked={task.isDone} />
                                        <span>{task.title}</span>
                                        <Button title={'x'} onClickHandler={deleteTaskHandler} />
                                    </li>)
                            })}
                        </ul>
                    )}
                </div>
                <Button title={'All'} onClickHandler={() => changeTasks('All')} />
                <Button title={'Active'} onClickHandler={() => changeTasks('Active')} />
                <Button title={'Completed'} onClickHandler={() => changeTasks('Completed')} />
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





