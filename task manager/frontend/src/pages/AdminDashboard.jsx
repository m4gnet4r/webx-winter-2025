import {useState,useEffect} from "react";
import {useNavigate} from "react-router-dom";
import Error from "../components/Error";
import Loader from "../components/Loader";
import API from "../api"

const AdminDashboard=()=>{
    const [users,setUsers]=useState([]);
    const [tasks,setTasks]=useState([]);
    const [error,setError]=useState("");
    const [loading,setLoading]=useState(false);
    const navigate=useNavigate();

    const fetchUsers=async()=>{
        setLoading(true);
        setError("");
        try{
            const res=await API.get("/api/admin/users") 
            setUsers(res.data);
        }catch(err){setError("Failed to load user list");}
        finally{setLoading(false);}
    }

    const fetchTasks=async()=>{
        setLoading(true);
        setError("");
        try{
            const res=await API.get("/api/admin/tasks") 
            setTasks(res.data);
        }catch(err){setError("Failed to load Task list");}
        finally{setLoading(false);}
    }

    const logout=()=>{
        localStorage.removeItem("token");
        navigate("/login")
    }

    useEffect(()=>{fetchUsers(); fetchTasks();},[]);

    return(
        <div className="container">
            <h2>Admin Dashboard</h2>
            <button onClick={logout}>Logout</button>
            <h3>Users List</h3>
            {loading?<Loader/> : error?<Error message={error}/> : 
            users.map(u=><p key={u._id}>{u.name} - {u.email}</p>)}
            <h3>Tasks List</h3>
            {loading ? <Loader/> : error ? <Error message={error}/> : 
            tasks.map(t=> <p key={t._id}> {t.title} ({t.user.name})</p>)}
        </div>
    )
}

export default AdminDashboard;