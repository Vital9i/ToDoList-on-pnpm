import { useRef } from 'react'
import { FilteredValue } from './App'
import { Button } from './Button'

type TodolistItemProps = {
    title: string
    tasks: TaskType[]
    deleteTask: (taskId: ()=>{}) => void
    changeTasks:(filterName:FilteredValue)=>void
    createTask:(title:string)=>void
}

type TaskType = {
    id: ()=>void
    title: string
    isDone: boolean
}

export const TodolistItem = ({ title, tasks, deleteTask, changeTasks,createTask }: TodolistItemProps) => {

    const [taskTitle, setTaskTitle] = useState('')

    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input value={taskTitle}/>
                <Button title={'Add task'} onClickHandler={()=>{}}/>
            </div>
            <ul>

                {tasks.length === 0 ? (<p>Тасок нет</p>) : (
                    tasks.map((task) => (
                        <li key={task}>
                            <input type="checkbox" checked={task.isDone} />
                            <span>{task.title}</span>
                            <Button title={'x'} onClickHandler={()=>deleteTask(task)} />
                        </li>
                    ))
                )}

            </ul>
            <div>
            <Button title={'All'} onClickHandler={()=> changeTasks('All')} />
            <Button title={'Active'} onClickHandler={()=> changeTasks('Active')} />
            <Button title={'Completed'} onClickHandler={()=> changeTasks('Completed')} />
            </div>
        </div>
    )
}