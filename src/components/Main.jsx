import Header from "./Header.jsx"
import React, {useState, useEffect} from 'react'
import {Table} from 'react-bootstrap'
import {useNavigate, Link} from 'react-router-dom'

function Main()
{
    const [data, setData] = useState([])
    useEffect(async ()=>{
        let result = await fetch("http://localhost:8000/api/list");
        result = await result.json();
        setData(result)
    }, [])
    const mark = async (id) =>
    {
        let user_id = JSON.parse(localStorage.getItem('user-info')).id
        //document.getElementById(id).style.backgroundColor = "yellow";
        let item = {id, user_id}
        let result = await fetch("http://localhost:8000/api/bookmark", {
            method:'POST',
            body:JSON.stringify(item), 
            headers:{
                "Content-Type":'application/json',
                "Accept":'application:json'
            }
        })
        result = await result.json()
        if(result.length>0)
        {
            console.log(result)
            alert("You have already marked this")
        }
        else
        {
            item = {id, user_id}
            result = await fetch("http://localhost:8000/api/mark", {
            method:'POST',
            body:JSON.stringify(item), 
            headers:{
                "Content-Type":'application/json',
                "Accept":'application:json'
                }
            })
            alert("Added to your bookmark list")
            result = await result.json()
        }
    }
    return(
        <div>
            <Header/>
            <h1>Main Page</h1>
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
                        <td>
                            <button
                            key={item.id} 
                            id={item.id} 
                            onClick={()=>mark(item.id)}
                            >
                                Bookmark
                            </button>
                        </td>
                    </tr>
                    )
                }
            </Table>
        </div>
    )
}

export default Main