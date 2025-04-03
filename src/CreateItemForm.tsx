import {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button} from "./Button.tsx";

type CreateItemFormProps = {
    createItem: (itemTitle: string) => void
}

export const CreateItemForm = (props:  CreateItemFormProps) => {
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
            <input
                value={ItemTitle}
                onChange={changeItemHandler}
                onKeyDown={createItemHandlerOnEnter}
                className={error ? 'error' : ''}
            />
            <Button title={'+'} onClick={createItemHandler}/>
            <p className={'errorMessage'}>{error}</p>
        </div>
    )
}