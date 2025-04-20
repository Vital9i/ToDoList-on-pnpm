import { tasksReducer } from './tasks-reducer.ts'
import { v1 } from 'uuid'
import { describe, test, expect, beforeEach } from 'vitest'
import {TasksState} from "../App.tsx";

describe('tasksReducer', () => {
    let todolistId1: string
    let todolistId2: string
    let initialState: TasksState

    beforeEach(() => {
        todolistId1 = v1()
        todolistId2 = v1()
        initialState = {
            [todolistId1]: [
                {id: 'task1', title: 'HTML&CSS', isDone: true},
                {id: 'task2', title: 'JS', isDone: false},
            ],
            [todolistId2]: [
                {id: 'task3', title: 'React', isDone: true},
            ]
        }
    })

    test('should create new todolist with empty tasks array', () => {
        const newTodolistId = v1()
        const action = {
            type: 'create_todolist',
            payload: {tlId: newTodolistId}
        } as const

        const newState = tasksReducer(initialState, action)

        expect(newState[newTodolistId]).toEqual([])
        expect(Object.keys(newState)).toHaveLength(3) // ← Здесь была пропущена закрывающая скобка
    })

    test('should delete todolist with all its tasks', () => {
        const action = {
            type: 'delete_todolist',
            payload: {tlId: todolistId1}
        } as const

        const newState = tasksReducer(initialState, action)

        expect(newState[todolistId1]).toBeUndefined()
        expect(Object.keys(newState)).toHaveLength(1)
    })
    test('should delete correct task', () => {
        const action = {
            type: 'delete_task',
            payload: {tlId: todolistId1, id: 'task1'}
        } as const

        const newState = tasksReducer(initialState, action)

        expect(newState[todolistId1].length).toBe(1)
        expect(newState[todolistId1][0].id).toBe('task2')
    })

    test('should create new task', () => {
        const newTaskId = v1()
        const action = {
            type: 'create_task',
            payload: {tlId: todolistId1, id: newTaskId, title: 'New Task'}
        } as const

        const newState = tasksReducer(initialState, action)

        expect(newState[todolistId1].length).toBe(3)
        expect(newState[todolistId1][0].title).toBe('New Task')
        expect(newState[todolistId1][0].isDone).toBe(false)
    })

    test('should change task status', () => {
        const action = {
            type: 'change_isDone',
            payload: {tlId: todolistId1, id: 'task2', isDone: true}
        } as const

        const newState = tasksReducer(initialState, action)

        expect(newState[todolistId1][1].isDone).toBe(true)
        // Проверяем, что другие задачи не изменились
        expect(newState[todolistId1][0].isDone).toBe(true)
        expect(newState[todolistId2][0].isDone).toBe(true)
    })
    test('should change task title correctly', () => {
        const action = {
            type: 'change_task_title',
            payload: {
                tlId: todolistId1,
                id: 'task2',
                title: 'Updated JavaScript'
            }
        } as const

        const newState = tasksReducer(initialState, action)

        // Проверяем что нужная задача изменилась
        const changedTask = newState[todolistId1].find(t => t.id === 'task2')
        expect(changedTask?.title).toBe('Updated JavaScript')

        // Проверяем что другие задачи не изменились
        expect(newState[todolistId1][0].title).toBe('HTML&CSS')
        expect(newState[todolistId2][0].title).toBe('React')

        // Проверяем что статус задачи не изменился
        expect(changedTask?.isDone).toBe(false)
    })
})