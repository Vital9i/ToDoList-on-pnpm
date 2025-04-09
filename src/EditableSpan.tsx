import {ChangeEvent,KeyboardEvent, useState} from "react";
import {TextField} from "@mui/material";

type EditableSpanProps = {
    title: string
    changeTitle: (title: string) => void
}

export const EditableSpan = (props: EditableSpanProps) => {

    const {title, changeTitle} = props

    const [editMode, setEditMode] = useState(false)
    const [newTitle, setNewTitle] = useState(title)

    const editableModeOn = () => {
        setEditMode(true)
    }
    const editableModeOff = () => {
        setEditMode(false)
        changeTitle(newTitle)
    }
    const changeInputTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }
    const changeInputTitleOnEnter = (e:KeyboardEvent<HTMLInputElement> ) => {
        if(e.key === 'Enter') {
            editableModeOff()
        }
    }

    return (
        editMode ?
            <TextField  variant="standard"
                        value={newTitle}
                        onChange={changeInputTitle}
                        autoFocus
                        onBlur={editableModeOff}
                        onKeyDown={changeInputTitleOnEnter}

            />
            :
            <span onDoubleClick={editableModeOn}>{title}</span>
    )
}