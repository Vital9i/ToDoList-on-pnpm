import {ChangeEvent,KeyboardEvent, useState} from "react";

type EditableSpan = {
    title: string,
    onChange:(newTaskTitle: string) => void
}

export const EditableSpan = (props: EditableSpan) => {
    const {title, onChange} = props

    const [isEditMode, setEditMode] = useState<boolean>(false)
    const [newTitle, setNewTitle] = useState(title)

    const isEditModeOn = () => {
        setEditMode(true)
    }
    const isEditModeOff = () => {
        setEditMode(false)
        onChange(newTitle)
    }
    const changeTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(event.currentTarget.value)
    }
    const changeTitleOnEnter = (event: KeyboardEvent<HTMLInputElement>) => {
        if(event.key === 'Enter') {
            isEditModeOff()
        }
    }

    return (
        <>
            {isEditMode ? (
                <input value={newTitle}
                       autoFocus
                       onBlur={isEditModeOff}
                       onChange={changeTitleHandler}
                       onKeyDown={changeTitleOnEnter}
                />
            ) : (
                <span onDoubleClick={isEditModeOn}>{title}</span>
            )}
        </>
    )
}