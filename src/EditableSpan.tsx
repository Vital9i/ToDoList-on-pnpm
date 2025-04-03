import {ChangeEvent, useState} from "react";

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

    return (
        <>
            {isEditMode ? (
                <input value={newTitle}
                       autoFocus
                       onBlur={isEditModeOff}
                       onChange={changeTitleHandler }
                />
            ) : (
                <span onDoubleClick={isEditModeOn}>{title}</span>
            )}
        </>
    )
}