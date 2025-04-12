import {ChangeEvent} from "react"
import {Button} from "./Button"
import {FilterValues, Todolist} from "./App"
import {CreateItemForm} from "./CreateItemForm.tsx";
import {EditableSpan} from "./EditableSpan.tsx";

type TodolistItemProps = {
    todolist: Todolist
    tasks: Task[]
    deleteTask: (todoListId: string, taskId: string) => void
    createTask: (todoListId: string, taskTitle: string) => void
    changeFilter: (todoListId: string, filterName: FilterValues) => void
    changeIsDone: (todoListId: string, taskId: string, isDone: boolean) => void
    deleteTodoList: (todoListId: string) => void
    changeTaskTitle: (todoListId: string, taskId: string, newTaskTitle: string) => void
    changeTodolistTitle: (todoListId: string, newTaskTitle: string) => void
}

export type Task = {
    id: string
    title: string
    isDone: boolean
}

export const TodolistItem = (props: TodolistItemProps) => {
    const {
              todolist: {id, title, filter},
              tasks,
              deleteTask,
              createTask,
              changeFilter,
              changeIsDone,
              deleteTodoList,
              changeTaskTitle,
              changeTodolistTitle
          } = props

    const changeFilterHandler = (filterName: FilterValues) => {
        changeFilter(id, filterName)
        // setFilter(filterName)
    }
    const changeIsDoneHandler = (taskId: string, isDone: boolean) => {
        changeIsDone(id, taskId, isDone)
    }
    const deleteTodoListHandler = () => {
        deleteTodoList(id)
    }
    const createTaskHandler = (itemTitle: string) => {
        createTask(id, itemTitle)
    }
    const changeTodolistTitleHandler = (newTodolistTitle: string) => {
        changeTodolistTitle(id, newTodolistTitle)
    }

    return (
        <div>
            <h3><EditableSpan title={title} onChange={changeTodolistTitleHandler}/></h3>
            <Button title={'X'} onClick={deleteTodoListHandler}/>
            <CreateItemForm createItem={createTaskHandler}/>
            <ul>
                {tasks.length === 0 ? (

                    <p>Тасок нет</p>
                ) : (
                    tasks.map(t => {

                        const changeTaskTitleHandler = (newTaskTitle: string) => {
                            changeTaskTitle(id, t.id, newTaskTitle)
                        }

                        return (<li key={t.id} className={t.isDone ? 'task-done' : ''}>
                            <input
                                type="checkbox"
                                checked={t.isDone}
                                onChange={(event: ChangeEvent<HTMLInputElement>) => changeIsDoneHandler(t.id, event.currentTarget.checked)}
                            />
                            <EditableSpan title={t.title} onChange={changeTaskTitleHandler}/>
                            <Button title={'X'} onClick={() => deleteTask(id, t.id)}/>
                        </li>)

                    })
                )}
            </ul>

            <div>
                <Button title={'All'} className={filter === 'all' ? 'filterBtn-active' : ''}
                        onClick={() => changeFilterHandler('all')}/>
                <Button title={'Active'} className={filter === 'active' ? 'filterBtn-active' : ''}
                        onClick={() => changeFilterHandler('active')}/>
                <Button title={'Completed'} className={filter === 'completed' ? 'filterBtn-active' : ''}
                        onClick={() => changeFilterHandler('completed')}/>
            </div>
        </div>
    )
}