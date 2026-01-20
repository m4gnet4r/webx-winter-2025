import {useState} from "react";
import { useNavigate } from "react-router-dom";
import Error  from "../components/Error";
import API from "../api"
import{Link} from "react-router-dom";

const Login = ()=>{
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [error,setError]=useState("");
    const[ load,setLoad]=useState(false);
    const navigate=useNavigate();

    const handleLogin=async()=>{
        setError("");
        setLoad(true);
        try{
            const res=await API.post("/api/auth/login",{email,password});
            localStorage.setItem("token",res.data.token);
            const payload = JSON.parse(atob(res.data.token.split(".")[1]));
            if(payload.role==="admin") navigate("/admin");
            else navigate("/user");
        }
        catch(err){
            setError(err.response?.data?.message || "Login failed");
        }
        finally{
            setLoad(false);
        }

    };


    return(
        <div className="container">
            <h2>Login</h2>
            <input placeholder="Enter email" value={email} onChange={e=>setEmail(e.target.value)} />
            <input placeholder="Enter password" value={password} type="password" onChange={e=>setPassword(e.target.value)} />
            <button onClick={handleLogin}>{load?"Logging in..":"Login"}</button>
            <p className="auth-link">
                Don't have an account?{" "}
                <Link to="/register">Resgister here</Link>
            </p>
            {error && <Error message={error}/>}
            
        </div>
    )
}

export default Login;