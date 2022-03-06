import Header from "./Header.jsx"
import React, {useState, useEffect} from 'react'
import {Table} from 'react-bootstrap'
import {useNavigate, Link} from 'react-router-dom'


function Bookmark()
{
    const [data, setData] = useState([])
    useEffect(async ()=>{
        let user_id = JSON.parse(localStorage.getItem('user-info')).id
        let item = {user_id}
        let result = await fetch("http://localhost:8000/api/bookmarklist", {
            method:'POST',
            body:JSON.stringify(item), 
            headers:{
                "Content-Type":'application/json',
                "Accept":'application:json'
            }
        })
        result = await result.json()
        setData(result)
    }, [])

    return(
        <div>
            <Header/>
            <h1>Your bookmark list</h1>
            <Table>
                <tr>
                    <td>Vote</td>
                    <td>Title</td>
                    <td>Author</td>
                </tr>
                {
                    data.map((item)=>
                    <tr>
                        <td>{item.vote}</td>
                        <td>{item.title}</td>
                        <td>{item.name}</td>
                        <td>
                            <Link to={"/post/"+item.id}>
                                <span>See more</span>
                            </Link>
                        </td>
                    </tr>
                    )
                }
            </Table>
        </div>
    )
}

export default Bookmark