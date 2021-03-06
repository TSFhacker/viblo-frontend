import React, {useState,useEffect} from 'react'
import Header from "./Header.jsx"
import {useNavigate} from 'react-router-dom'

function Protected(props)
{
    const navigate = useNavigate()
    let Cmp = props.Cmp
    useEffect(()=>{
        if(!localStorage.getItem('user-info'))
        {
            navigate("/register")
        }
    }, [])
    return(
        <div>
            <Cmp/>
        </div>
    )
}

export default Protected