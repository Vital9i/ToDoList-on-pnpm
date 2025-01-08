import {Button} from "./Button.tsx";
import {FilteredValue} from "./App.tsx";

type TodolistItemProps = {
    title: string
    tasks: TaskProps[]
    deleteTask: (taskId: number) => void
    changeTasks: (filter:FilteredValue) => void
}

export type TaskProps = {
    id: number
    title: string
    isDone: boolean
}

export const TodolistItem = ({title, tasks, deleteTask,changeTasks}: TodolistItemProps) => {
    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input/>
                <Button title={'addTask'} onClickHandler={()=>{}}/>
            </div>
            <ul>
                {tasks.length === 0?
                (<p>Тасок нет</p>):
                (tasks.map((task) => (
                    <li key={task.id}>
                        <input type="checkbox" checked={task.isDone}/>
                        <span>{task.title}</span>
                        <button onClick={() => deleteTask(task.id)}>X</button>
                    </li>
                )))}
            </ul>
            <div>
                <Button title={'All'} onClickHandler={()=>changeTasks('All')}/>
                <Button title={'Active'} onClickHandler={()=>changeTasks('Active')}/>
                <Button title={'Completed'} onClickHandler={()=>changeTasks('Completed')}/>
            </div>
        </div>
    )
}