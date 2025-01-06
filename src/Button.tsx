
type ButtonProps = {
    title: string;
    onClickHandler?: () => void;
}

export const Button = ({onClickHandler,title}:ButtonProps) =>{
    return (
        <button onClick={onClickHandler}>{title}</button>
    )
}