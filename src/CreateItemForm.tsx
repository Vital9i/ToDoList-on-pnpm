import Button from "@mui/material/Button";
import {ChangeEvent, KeyboardEvent, useState} from "react";
import {TextField} from "@mui/material";
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';

type CreateItemForm = {
    onCreateItem: (title: string) => void,
}

export const CreateItemForm = (props: CreateItemForm) => {
    const {onCreateItem} = props

    const [inputTitle, setInputTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const maxTitleLength = 12

    const createTaskHandler = () => {
        if (inputTitle.trim()) {
            onCreateItem(inputTitle.trim())
            setInputTitle('')
        } else {
            setError('title is not required')
        }
    }

    const changeTaskHandler = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.currentTarget.value.length <= maxTitleLength) {
            setInputTitle(event.currentTarget.value)
            setError(null)
        } else {
            setError('enter valid title')
        }
    }

    const createTaskHandlerOnEnter = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            createTaskHandler()
        }
    }

    return (
        <>
            <TextField
                size={"small"}
                variant={"outlined"}
                label={`${maxTitleLength} charters max length`}
                value={inputTitle}
                onChange={changeTaskHandler}
                onKeyDown={createTaskHandlerOnEnter}
                error={!!error}
                helperText={error}
            />
            <Button
                size="small"
                disableElevation
                disabled={!!error}
                onClick={createTaskHandler}
            >
                <AddBoxOutlinedIcon/>
            </Button>
         </>
    )
}