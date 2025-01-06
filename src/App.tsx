import './App.css'
import {TodolistItem} from "./TodolistItem.tsx";
import {useState} from "react";

export type TasksProps = {
  id: number
  title: string
  isDone: boolean
}

export  type FilterValuesType = 'all' | 'completed' | 'active'

export  const App = ()=> {



  // const tasks2:TasksProps[] = [
  //   { id: 1, title: 'Hello world', isDone: true },
  //   { id: 2, title: 'I am Happy', isDone: false },
  //   { id: 3, title: 'Yo', isDone: false },
  //   { id: 4, title: 'Redux', isDone: false }
  // ]



   const [tasks1,setTasks1] = useState([
    { id: 1, title: 'HTML&CSS', isDone: true },
    { id: 2, title: 'JS', isDone: true },
    { id: 3, title: 'ReactJS', isDone: false },
    { id: 4, title: 'Redux', isDone: false },
  ])

  const [filter,setFilter] = useState<FilterValuesType>('all')

  const deleteTask = (id:number) => {
    setTasks1(tasks1.filter(t => t.id !== id))
  };

  const changeToDoListFilter = (filter: FilterValuesType)=>{
    setFilter(filter)
  }

  const  getFilteredTasks = (tasks:TasksProps[],filterValue: FilterValuesType) =>{
    switch (filterValue){
      case 'active':
        return tasks.filter(t=> !t.isDone )
      case 'completed':
        return tasks.filter(t=> t.isDone )
      default:
        return tasks
    }
  }

  const filteredTasks = getFilteredTasks(tasks1,filter)

  return (
      <div className='app'>
        <TodolistItem title='What to learn'
                      tasks={filteredTasks}
                      date='23.12.1991'
                      deleteTask={deleteTask}
                      changeToDoListFilter={changeToDoListFilter}
        />
        {/*<TodolistItem title='Songs' tasks={tasks2}/>*/}
      </div>
  )

}


