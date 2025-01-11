import { FilteredValue } from './App'
import { Button } from './Button'

type TodolistItemProps = {
    title: string
    tasks: TaskType[]
    deleteTask: (taskId: number) => void
    changeTasks:(filterName:FilteredValue)=>void
}

type TaskType = {
    id: number
    title: string
    isDone: boolean
}

export const TodolistItem = ({ title, tasks, deleteTask, changeTasks }: TodolistItemProps) => {
    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input />
                <Button title={'Add task'} />
            </div>
            <ul>

                {tasks.length === 0 ? (<p>Тасок нет</p>) : (
                    tasks.map((task) => (
                        <li key={task.id}>
                            <input type="checkbox" checked={task.isDone} />
                            <span>{task.title}</span>
                            <Button title={'x'} onClickHandler={()=>deleteTask(task.id)} />
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