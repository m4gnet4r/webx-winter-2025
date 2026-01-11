import {useState} from "react";
import {useNavigate,Link} from "react-router-dom"
import API from "../api";
import Error from "../components/Error";


const Register=()=>{
    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [load,setLoad]=useState(false);
    const [error,setError]=useState("");
    const navigate=useNavigate();

    const handleRegister=async()=>{
        setLoad(true);
        setError("");
        try{
            const res = await API.post("/auth/register",{name,email,password});
            alert(res.data.message);
            navigate("/login");
        }catch(err){
            setError(err.response?.data?.message || "Registration  failed");
            console.log(err.response);
        }finally{
            setLoad(false);
        }
    }
    return(
        <div className="container">
            <h2>Register</h2>
            <input placeholder="Enter Name" value={name} onChange={e=>setName(e.target.value)}/>
            <input placeholder="Enter Email" value={email} type="email" onChange={e=>setEmail(e.target.value)}/>
            <input placeholder="Enter Password" value={password} onChange={e=>setPassword(e.target.value)}/>
            <button onClick={handleRegister} >{load? "Registering ..." : "Register"}</button>
            <p className="auth-link">
                Already have an account{" "}
                <Link to="/login">Login here</Link>
            </p>
            {error && <Error message={error}/>}
        </div>
    );
}

export default Register;