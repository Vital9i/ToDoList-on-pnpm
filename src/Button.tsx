
type ButtonType = {
    title:string
    onClickHandler?:()=>void
    classes?:string
}

export const Button = ({title,onClickHandler,classes}:ButtonType) =>{
    return(
  <button 
  className={classes}
  onClick={onClickHandler}>{title}</button>
    )
}