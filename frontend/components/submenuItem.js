import { BiChevronRight } from "react-icons/bi";


const SubMenuItem = (props) =>{
    

    return(
        <>
        <span className="flex flex-row  gap-1 font-normal px-2 rounded-md hover:bg-violet-500" onClick={props.onClick} >
            <BiChevronRight className="h-full w-max-[20px]"/>
            {props.text}
        </span>
        </>
    )
}

export default SubMenuItem;