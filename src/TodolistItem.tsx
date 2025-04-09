import {ChangeEvent} from "react"
import Button from "@mui/material/Button";
import {Box, Checkbox, IconButton, List, ListItem} from "@mui/material";
import {FilterValues, Todolist} from "./App"
import {CreateItemForm} from "./CreateItemForm.tsx";
import {EditableSpan} from "./EditableSpan.tsx";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {getListItemSx} from './TodolistitemStyles.ts'

type TodolistItemProps = {
    todolist: Todolist
    tasks: Task[]
    deleteTask: (todoListId: string, taskId: string) => void
    createTask: (todoListId: string, taskTitle: string) => void
    changeFilter: (todoListId: string, filterName: FilterValues) => void
    changeIsDone: (todoListId: string, taskId: string, isDone: boolean) => void
    deleteTodoList: (todoListId: string) => void
    changeTaskTitle: (todoListId: string, taskId: string, newTaskTitle: string) => void
    changeTodolistTitle: (todoListId: string, newTitle: string) => void
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
    const createTaskHandler = (title: string) => {
        createTask(id, title)
    }
    const changeTaskTitleHandler = (taskId: string, newTitle: string) => {
        changeTaskTitle(id, taskId, newTitle)
    }
    const changeTodolistTitleHandler = (newTitle: string) => {
        changeTodolistTitle(id, newTitle)
    }

    return (
        <div>

            <div style={{display: 'flex'}}>
                <h3>
                    <EditableSpan title={title} changeTitle={changeTodolistTitleHandler}/>
                </h3>

                <IconButton aria-label="delete"
                            onClick={deleteTodoListHandler}>
                    <DeleteForeverIcon fontSize='small'/>
                </IconButton>
            </div>

            <div>
                <CreateItemForm onCreateItem={createTaskHandler}/>
            </div>

            <List>
                {tasks.length === 0 ? (
                    <p>Тасок нет</p>
                ) : (
                    tasks.map(t => (

                        <ListItem key={t.id}
                                  disablePadding
                                  sx={getListItemSx(t.isDone)}
                        >
                            <Box>
                                <Checkbox
                                    size="small"
                                    checked={t.isDone}
                                    onChange={(event: ChangeEvent<HTMLInputElement>) => changeIsDoneHandler(t.id, event.currentTarget.checked)}
                                />
                                <EditableSpan title={t.title}
                                              changeTitle={(newTitle) => changeTaskTitleHandler(t.id, newTitle)}/>
                            </Box>
                            <Box></Box>

                            <IconButton
                                aria-label="delete"
                                onClick={() => deleteTask(id, t.id)}>
                                <DeleteForeverIcon fontSize="small"/>
                            </IconButton>
                        </ListItem>
                    ))
                )}
            </List>

            <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                <Button
                    variant='contained'
                    size="small"
                    disableElevation
                    color={filter === 'all' ? 'secondary' : 'primary'}
                    onClick={() => changeFilterHandler('all')}>
                    All
                </Button>
                <Button
                    variant='contained'
                    size="small"
                    disableElevation
                    color={filter === 'active' ? 'secondary' : 'primary'}
                    onClick={() => changeFilterHandler('active')}>
                    Active
                </Button>
                <Button
                    variant='contained'
                    size="small"
                    disableElevation
                    color={filter === 'completed' ? 'secondary' : 'primary'}
                    onClick={() => changeFilterHandler('completed')}>
                    Completed
                </Button>
            </Box>
        </div>
    )
}