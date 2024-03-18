import { CgProfile } from "react-icons/cg";


export default function SignIn() {
    return (
      <div className="flex justify-center items-center bg-black h-screen">
        <div className=" flex justify-center items-center bg-white h-[70vh] w-[40vw] rounded-3xl">
            <div className="flex flex-col items-center h-[90%] w-[70%]">
                <div className="h-[110px] w-[110px] mb-2">
                    <CgProfile className="h-full w-full"></CgProfile>
                </div>
                <h1 className="text-2xl font-semibold">Ini tulisan random</h1>
                <div className="w-full h-[50px]">
                    <div className="w-full h-1/3 ">
                        Email
                    </div>
                    <div className="w-full h-2/3">
                        Ini email text box
                    </div>
                </div>
            </div>
        </div>
      </div>
    
    );
  }
  