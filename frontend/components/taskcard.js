


export default function TaskCard({role, taskname, stardate, enddate}) {


    return(
        
            <div className="bg-white rounded-lg shadow-lg p-4">
              <div className="text-sm font-semibold">{role}</div>
              <div className="text-xs">Task: {taskname}</div>
              <div className="text-xs">Start Date: {stardate}</div>
              <div className="text-xs">End Date: {enddate}</div>
            </div>
        
    )
    
}