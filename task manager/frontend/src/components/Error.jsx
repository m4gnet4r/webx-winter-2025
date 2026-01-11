const Error=({message})=>{
    if(!message)return null;
    return(
        <div>
            <p style={{color:"red"}}>{message}</p>;
        </div>
    )
}

export default Error;