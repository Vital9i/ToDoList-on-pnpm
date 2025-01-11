
type ButtonType = {
    title:string
    onClickHandler?:()=>void
}

export const Button = ({title,onClickHandler}:ButtonType) =>{
    return(
  <button onClick={onClickHandler}>{title}</button>
    )
}