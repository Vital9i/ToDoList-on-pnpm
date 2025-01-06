import {FilterValuesType, TasksProps} from "./App.tsx";
import {Button} from "./Button.tsx";

export type TodolistItemProps = {
    title: string
    tasks: TasksProps[]
    date?: string
    deleteTask: (id:number) => void
    changeToDoListFilter:(filter:FilterValuesType) => void

}

export const TodolistItem = ({ changeToDoListFilter,deleteTask,title,tasks,date}:TodolistItemProps) => {
    return (
        <div>

            <h3>{title}</h3>

            <div>
                <input/>
                <Button title='add task'/>
            </div>
            {tasks.length ===0? (
                <p>Тасок нет</p>):(
                    <ul>
                {tasks.map((task)=>{
                    return(
                        <li key={task.id}>
                        <input type="checkbox" checked={task.isDone}/>
                        <span>{task.title}</span>
                            <Button title='x' onClickHandler={()=> deleteTask(task.id)}/>
                    </li>
                    )})}
                     </ul>
            )}
            <div>
                <Button title='All' onClickHandler={()=>  changeToDoListFilter('all')}/>
                <Button title='Active' onClickHandler={()=>  changeToDoListFilter('active')}/>
                <Button title='Completed' onClickHandler={()=>  changeToDoListFilter('completed')}/>
            </div>

            <div>
                {date}
            </div>
        </div>
    )
}