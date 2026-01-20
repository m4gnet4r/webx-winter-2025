import{useState,useEffect} from "react";
import API from "../api";
import {useNavigate} from "react-router-dom";
import Error from "../components/Error";
import Loader from "../components/Loader";
import TaskCard from "../components/task";

const UserDashboard=()=>{
    const [tasks,setTasks]=useState([]);
    const [newTask,setNewTask]=useState("");
    const [loading,setLoading]=useState(false);
    const [error,setError] = useState("");
    const navigate=useNavigate();

    const fetchTasks=async ()=>{
        setLoading(true);
        try{
            const res= await API.get("/api/tasks");
            setTasks(res.data);
        }catch(err){setError("Failed to Load Task");}
        finally{setLoading(false) ;}
    };

    useEffect(()=>{fetchTasks();},[]);

    const addTask= async()=>{
        if(!newTask)return;
        try{
            await API.post("/api/tasks",{title:newTask});
            setNewTask("");
            fetchTasks();
        }catch(err){
            setError(err.response?.data?.message || "Failed to add Task");
            console.log(err.response);
        }
    };

    const deleteTask=async(id)=>{
        try{
            await API.delete(`/api/tasks/${id}`);
            fetchTasks();
        }catch{setError("Failed to delete Task");}
    }

    const updateTask=async(id)=>{
        try{
            await API.put(`/api/tasks/${id}`);
            fetchTasks();
        }catch{setError("Failed to update Task");}
    }

    const logout=()=>{
        localStorage.removeItem("token");
        navigate("/login");
    }

    return(
        <div className="container">
            <h2>User Tasks</h2>
            <button onClick={logout}>Logout</button>
            <input placeholder="New Task" value={newTask} onChange={e=>setNewTask(e.target.value)}/>
            <button onClick={addTask}>Add Task</button>
            {loading? <Loader/>: 
            tasks.map(t=><TaskCard key={t._id} task={t} onUpdate={updateTask} onDelete={deleteTask} />)};
            {error && <Error message={error}/>}
        </div>
    )
 
}

export default UserDashboard;