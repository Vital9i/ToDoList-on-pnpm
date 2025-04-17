import {ChangeEvent, KeyboardEvent, useState} from "react";
import { TextField} from '@mui/material'
import IconButton from "@mui/material/IconButton";
import AddBoxIcon from '@mui/icons-material/AddBox'

type CreateItemFormProps = {
    createItem: (itemTitle: string) => void
}

export const CreateItemForm = (props: CreateItemFormProps) => {
    const {createItem} = props
    const [ItemTitle, setItemTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const createItemHandler = () => {
        if (ItemTitle.trim()) {
            createItem(ItemTitle.trim())
            setItemTitle('')
        } else {
            setError('title is not required')
        }
    }
    const changeItemHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setItemTitle(event.currentTarget.value)
        setError(null)
    }
    const createItemHandlerOnEnter = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            createItemHandler()
        }
    }
    return (
        <div>
            <TextField id="outlined-basic"
                       label="Enter title"
                       variant="outlined"
                       value={ItemTitle}
                       onChange={changeItemHandler}
                       onKeyDown={createItemHandlerOnEnter}
                       error={!!error}
                       helperText={error}
            />
            <IconButton onClick={createItemHandler} color={'primary'}>
                <AddBoxIcon />
            </IconButton>
        </div>
    )
}