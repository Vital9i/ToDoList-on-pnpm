import {SxProps} from "@mui/material";

export const getListItemSx = (isDone: boolean): SxProps => ({
    p: 0,
    fontWeight: isDone ? 'regular' : 'bold',
    textDecoration: isDone ?'line-through' : 'none',
    justifyContent: 'space-between',
    opacity: isDone ? 0.5 : 1,
})