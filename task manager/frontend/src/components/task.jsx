const TaskCard=({task,onUpdate,onDelete})=>(
    <div style={{
        background : "#1e293b",
        padding: "15px",
        margin : "10px px",
        borderRadius:"8px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
    }}>

        <span style={{color: task.completed ? "green" : "white",
          fontWeight: "500"}}>
            {task.title}
        </span>
        <div>
            <button onClick={()=>onUpdate(task._id)} style={{marginRight:5 , color: task.completed ? "green" : "white"}}>{task.completed ? "Completed" : "To do"}</button>
            <button onClick={()=>onDelete(task._id)} style={{marginRight:5 , color:"red"}}>Delete</button>
        </div>
        
    
    </div>
);

export default TaskCard;