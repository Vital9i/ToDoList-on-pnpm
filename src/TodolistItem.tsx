import {Button} from "./Button.tsx";

type TodolistItemProps = {
    title: string
    tasks: TaskProps[]
    date?: string
}

export type TaskProps = {
    id: number
    title: string
    isDone: boolean
}

export const TodolistItem = ({title, tasks, date}: TodolistItemProps) => {
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
                            </li>
                        )
                    }))}
            </ul>
            <div>
                <Button title={'All'}/>
                <Button title={'Active'}/>
                <Button title={'Completed'}/>
            </div>
            <span>{date}</span>
        </div>
    )
}