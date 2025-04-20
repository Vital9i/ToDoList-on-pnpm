import {useReducer, useState} from 'react'
import './App.css'
import {Task, TodolistItem} from './TodolistItem'
import {v1} from 'uuid'
import {CreateItemForm} from "./CreateItemForm.tsx";
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import {NavButton} from "./NavButton.ts";
import {containerSx} from "./TodolistItem.styles.ts";
import {createTheme, ThemeProvider} from "@mui/material";
import Switch from '@mui/material/Switch'
import CssBaseline from '@mui/material/CssBaseline'
import {
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    createTodolistAC, deleteTodolistAC,
    todolistReducer
} from "./model/todolist-reducer.ts";
import {
    changeIsDoneAC,
    createTaskAC,
    deleteTaskAC,
    deleteTodoListForTasksAC,
    createTodolistForTasksAC,
    tasksReducer, changeTaskTitleAC,
} from "./model/tasks-reducer.ts";

export type FilterValues = 'all' | 'active' | 'completed'
export type Todolist = {
    id: string
    title: string
    filter: FilterValues
}
export type TasksState = {
    [key: string]: Task[]
}

type ThemeMode = 'dark' | 'light'

export const App = () => {

    const todolistId1 = v1()
    const todolistId2 = v1()

    const inicialState: Todolist[] = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'},
    ]
    const [todolists, dispatchToTodolists] = useReducer(todolistReducer, inicialState)

    const [tasks, dispatchTasks] = useReducer(tasksReducer, {
        [todolistId1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
            {id: v1(), title: 'Redux', isDone: true},
            {id: v1(), title: 'Vue', isDone: false},
            {id: v1(), title: 'Angular', isDone: false},
        ],
        [todolistId2]: [
            {id: v1(), title: 'Rest API', isDone: true},
            {id: v1(), title: 'GraphQL', isDone: false},
            {id: v1(), title: 'StyledComponents', isDone: true},
            {id: v1(), title: 'PHP', isDone: false},
            {id: v1(), title: 'NextJS', isDone: true},
            {id: v1(), title: 'NodeJS', isDone: false},
        ],
    })

    const [themeMode, setThemeMode] = useState<ThemeMode>('light')
    const theme = createTheme({
        palette: {
            mode: themeMode,
            primary: {
                main: '#087EA4',
            },
        },
    })
    const changeMode = () => {
        setThemeMode(themeMode === 'light' ? 'dark' : 'light')
    }

    const deleteTask = (todoListId: string, taskId: string) => {
        dispatchTasks(deleteTaskAC(todoListId,taskId))
    }
    const createTask = (todoListId: string, taskTitle: string) => {
           dispatchTasks(createTaskAC(todoListId,taskTitle))
    }
    const changeFilter = (todoListId: string, filterName: FilterValues) => {
        dispatchToTodolists(changeTodolistFilterAC({id: todoListId, filter: filterName}))
    }
    const changeIsDone = (todoListId: string, taskId: string, isDone: boolean) => {
           dispatchTasks(changeIsDoneAC(todoListId,taskId,isDone))
    }
    const deleteTodoList = (todoListId: string) => {
        dispatchToTodolists(deleteTodolistAC(todoListId))
        dispatchTasks(deleteTodoListForTasksAC(todoListId))
    }
    const createTodolist = (newTodolistTitle: string) => {
        const todolistId = v1()
        dispatchToTodolists(createTodolistAC(todolistId, newTodolistTitle))
        dispatchTasks(createTodolistForTasksAC(todolistId))
    }
    const changeTaskTitle = (todoListId: string, taskId: string, newTaskTitle: string) => {
dispatchTasks(changeTaskTitleAC(todoListId, taskId, newTaskTitle))
    }
    const changeTodolistTitle = (todoListId: string, newTodolistTitle: string) => {
        dispatchToTodolists(changeTodolistTitleAC({id: todoListId, title: newTodolistTitle}))
    }

    return (
        <div className="app">
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <AppBar position="static" sx={{mb: '30px'}}>
                    <Toolbar>
                        <Container maxWidth={'lg'} sx={containerSx}>
                            <IconButton color="inherit">
                                <MenuIcon/>
                            </IconButton>
                            <div>
                                <NavButton>Sign in</NavButton>
                                <NavButton>Sign up</NavButton>
                                <NavButton background={theme.palette.primary.dark}>Faq</NavButton>
                                <Switch color={'default'} onChange={changeMode}/>
                            </div>
                        </Container>
                    </Toolbar>
                </AppBar>
            </ThemeProvider>

            <Container maxWidth={'lg'}>
                <Grid container sx={{mb: '30px'}}>
                    <CreateItemForm createItem={createTodolist}/>
                </Grid>

                <Grid container spacing={4}>
                    {todolists.map(el => {
                        let filteredTasks = tasks[el.id]

                        switch (el.filter) {
                            case 'all':
                                filteredTasks = tasks[el.id]
                                break;
                            case 'active':
                                filteredTasks = tasks[el.id].filter(t => !t.isDone)
                                break;
                            case 'completed':
                                filteredTasks = tasks[el.id].filter(t => t.isDone)
                                break;
                            default:
                                filteredTasks = tasks[el.id]
                        }
                        return (

                            <Grid key={el.id}>
                                <Paper sx={{p: '0 20px 20px 20px'}}>
                                    <TodolistItem
                                        todolist={el}
                                        tasks={filteredTasks}
                                        deleteTask={deleteTask}
                                        createTask={createTask}
                                        changeFilter={changeFilter}
                                        changeIsDone={changeIsDone}
                                        deleteTodoList={deleteTodoList}
                                        changeTaskTitle={changeTaskTitle}
                                        changeTodolistTitle={changeTodolistTitle}
                                    />
                                </Paper>
                            </Grid>
                        )
                    })}
                </Grid>
            </Container>
        </div>
    )
}

