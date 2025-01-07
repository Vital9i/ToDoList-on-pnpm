import {Button} from "./Button.tsx";
import {FilterValues} from "./App.tsx";

type TodolistItemProps = {
    title: string
    tasks: TaskProps[]
    date?: string
    deleteTask: (id: number) => void
    changeFilter:(filter:FilterValues)=>void
}

export type TaskProps = {
    id: number
    title: string
    isDone: boolean
}

export const TodolistItem = ({
                                 title,
                                 tasks,
                                 date,
                                 deleteTask,
                                 changeFilter
                             }: TodolistItemProps) => {
    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input/>
                <Button title={'Add task'}/>
            </div>
            <ul>
                {tasks.length === 0 ? (
                    <p>Тасок нет</p>) : (
                    tasks.map((task) => {
                        return (
                            <li key={task.id}>
                                <input type="checkbox" checked={task.isDone}/>
                                <span>{task.title}</span>
                                <Button title={'X'} onClickHandler={() => deleteTask(task.id)}/>
                            </li>
                        )
                    }))}
            </ul>
            <div>
                <Button title={'All'} onClickHandler={()=>changeFilter('All')}/>
                <Button title={'Active'} onClickHandler={()=>changeFilter('Active')}/>
                <Button title={'Completed'} onClickHandler={()=>changeFilter('Completed')}/>
            </div>
            <span>{date}</span>
        </div>
    )
}