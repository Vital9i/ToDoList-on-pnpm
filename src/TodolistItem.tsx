
import { useRef, useState } from 'react'
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

    return (
        <div>
            <h3>{title}</h3>

            <div>
                <input value={newTask}
                    onChange={(event) => setNewTask(event.currentTarget.value)}
                    onKeyDown={(event) => {
                        if (event.key === 'Enter') {
                            addTask(newTask)
                            setNewTask('')
                        }
                    }} />

                <Button title={'addTask'} onClickHandler={() => {
                    addTask(newTask)
                    setNewTask('')
                }} />
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






