import React, {useState,useEffect} from 'react'
import Header from "./Header.jsx"
import {useNavigate} from 'react-router-dom'

function Login()
{
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const navigate=useNavigate();

    useEffect(()=>{
        if(localStorage.getItem('user-info'))
        {
            navigate("/main")
        }
    }, [])

    async function login()
    {
        let item={email, password}
        let result = await fetch("http://localhost:8000/api/login", {
            method:'POST',
            body:JSON.stringify(item), 
            headers:{
                "Content-Type":'application/json',
                "Accept":'application:json'
            }
        })
        result = await result.json()
        localStorage.setItem("user-info",JSON.stringify(result))
        if(result.name)
            navigate("/main")
        else
        {
            alert("Wrong email or password")
            setEmail("")
            setPassword("")
        }
    }

    return(
        <div>
            <Header />
            <h1>Login Page</h1>

            <div className="col-sm-6 offset-sm-3">
                <input type="text" value={email} onChange={(e)=> setEmail(e.target.value)} placeholder="email" className="form-control" />
                <br/>
                <input type="password" value={password} onChange={(e)=> setPassword(e.target.value)} placeholder="password" className="form-control" />
                <br/>
                <button onClick={login} className='btn btn-primary'>Log in</button>
            </div>
        </div>
    )
}

export default Login