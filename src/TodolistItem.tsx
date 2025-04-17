import {ChangeEvent} from "react"
import {containerSx, getListItemSx} from './TodolistItem.styles'
import {FilterValues, Todolist} from "./App"
import {CreateItemForm} from "./CreateItemForm.tsx";
import {EditableSpan} from "./EditableSpan.tsx";
import {Box, Button, Checkbox, List, ListItem} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'

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
              todolist: {id, title},
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
            <Button onClick={deleteTodoListHandler}><DeleteIcon/></Button>
            <CreateItemForm createItem={createTaskHandler}/>
            <List>
                {tasks.length === 0 ? (

                    <p>Тасок нет</p>
                ) : (
                    tasks.map(t => {

                        const changeTaskTitleHandler = (newTaskTitle: string) => {
                            changeTaskTitle(id, t.id, newTaskTitle)
                        }

                        return (
                            <ListItem key={t.id}
                                      sx={getListItemSx(t.isDone)}>
                                <div>
                                <Checkbox checked={t.isDone}
                                          onChange={(event: ChangeEvent<HTMLInputElement>) => changeIsDoneHandler(t.id, event.currentTarget.checked)}/>
                                <EditableSpan title={t.title} onChange={changeTaskTitleHandler}/>
                                </div>
                                <Button onClick={() => deleteTask(id, t.id)}><DeleteIcon/></Button>
                            </ListItem>)
                    })
                )}
            </List>

            <Box sx={containerSx}>
                <Button variant="contained" onClick={() => changeFilterHandler('all')}>All</Button>
                <Button variant="contained" onClick={() => changeFilterHandler('active')}>Active</Button>
                <Button variant="contained" onClick={() => changeFilterHandler('completed')}>Completed</Button>
            </Box>
        </div>
    )
}