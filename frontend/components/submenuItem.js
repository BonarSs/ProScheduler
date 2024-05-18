import { BiChevronRight } from "react-icons/bi";


const SubMenuItem = (props) =>{

    return(
        <>
        <div className="flex flex-row items-center gap-1 font-normal ">
            <BiChevronRight className="h-full w-max-[20px]"/>
            {props.text}
        </div>
        </>
    )
}

export default SubMenuItem;