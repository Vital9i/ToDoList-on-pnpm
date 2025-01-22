
type ButtonType = {
    title:string
    onClickHandler?:()=>void
    className?:string
}

export const Button = ({title,onClickHandler, className}:ButtonType) =>{
    return(
  <button 
  className={ className}
  onClick={onClickHandler}>{title}</button>
    )
}