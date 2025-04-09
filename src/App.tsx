import {useState} from 'react'
import './App.css'
import {Task, TodolistItem} from './TodolistItem'
import {v1} from 'uuid'
import {CreateItemForm} from "./CreateItemForm.tsx";
import {
    AppBar,
    Box,
    Container,
    createTheme,
    CssBaseline,
    Grid,
    IconButton,
    Paper, Switch,
    ThemeProvider,
    Toolbar
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
// import Button from "@mui/material/Button";
import {NavButton} from "./NavButton.tsx";
import { lime, purple } from '@mui/material/colors';

export type FilterValues = 'all' | 'active' | 'completed'

export type Todolist = {
    id: string
    title: string
    filter: FilterValues
}

export type TasksState = {
    [key: string]: Task[]
}

export const App = () => {

    const todolistId1 = v1()
    const todolistId2 = v1()

    const [todolists, setTodolists] = useState<Todolist[]>([
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'},
    ])

    const [tasks, setTasks] = useState<TasksState>({
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

    const deleteTask = (todoListId: string, taskId: string) => {
        setTasks({...tasks, [todoListId]: tasks[todoListId].filter(t => t.id !== taskId)})
    }
    const createTask = (todoListId: string, taskTitle: string) => {
        setTasks({...tasks, [todoListId]: [{id: v1(), title: taskTitle, isDone: false}, ...tasks[todoListId]]})
    }
    const changeFilter = (todoListId: string, filterName: FilterValues) => {
        setTodolists(todolists.map(el => el.id === todoListId ? {...el, filter: filterName} : el))
        console.log(todoListId)
    }
    const changeIsDone = (todoListId: string, taskId: string, isDone: boolean) => {
        setTasks({...tasks, [todoListId]: tasks[todoListId].map(el => el.id === taskId ? {...el, isDone: isDone} : el)})
    }
    const deleteTodoList = (todoListId: string) => {
        setTodolists(todolists.filter(el => el.id !== todoListId))
        delete tasks[todoListId]
        setTasks({...tasks})
        console.log(tasks)
    }
    const createTodolist = (newTodoliostTitle: string) => {
        const newTodolistId = v1()
        setTodolists([...todolists, {id: newTodolistId, title: newTodoliostTitle, filter: 'all'}])
        setTasks({...tasks, [newTodolistId]: []})
    }
    const changeTaskTitle = (todoListId: string, taskId: string, newTitle: string) => {
        setTasks({...tasks, [todoListId]: tasks[todoListId].map(t => t.id === taskId ? {...t, title: newTitle} : t)})
    }
    const changeTodolistTitle = (todoListId: string, newTitle: string) => {
        setTodolists(todolists.map(tl => tl.id === todoListId ? {...tl, title: newTitle} : tl))
    }


    const [isDarkMode, setIsDarkMode] = useState<boolean>(false)

    const theme = createTheme({
        palette: {
            primary: lime,
            secondary: purple,
            mode: isDarkMode ? 'dark' : 'light'
        }
    })

    return (
        <div className="app">
            <ThemeProvider theme={theme}>
                <CssBaseline/>
            <AppBar position="static">
                <Toolbar>
                    <Container maxWidth={'lg'} sx={{display:'flex',justifyContent:'space-between'}}>
                        <IconButton color="inherit">
                            <MenuIcon/>
                        </IconButton>
                        <Box>
                            <NavButton>Sign in</NavButton>
                            <NavButton>Sign up</NavButton>
                            <NavButton background={theme.palette.secondary.light}>Faq</NavButton>
                            <Switch onChange={()=>setIsDarkMode(!isDarkMode)}/>
                        </Box>
                    </Container>
                </Toolbar>
            </AppBar>
            <Container maxWidth={'lg'}>
                <Grid container sx={{p: '20px 20px 20px 0'}}>
                    <div><CreateItemForm onCreateItem={createTodolist}/></div>
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
                                <Paper elevation={8} sx={{p: '20px'}}>
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
            </ThemeProvider>

        </div>
    )
}

