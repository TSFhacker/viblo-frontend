import Header from "./Header.jsx"
import {useState, useEffect} from 'react'
import {withRouter} from "./withRouter";
import Comments from "./Comments.jsx";

function Post(props)
{
    const [data, setData]=useState([])
    //console.log(props.router.params.id)
    useEffect(async ()=>{
        let result = await fetch("http://localhost:8000/api/post/"+props.router.params.id)
        result = await result.json()
        setData(result)
    }, [])

    const up = async () => {
        let user_id = JSON.parse(localStorage.getItem('user-info')).id
        let vote = 1;
        let post_id = props.router.params.id
        let item = {user_id, post_id, vote}
        let result = await fetch("http://localhost:8000/api/findpostvote2", {
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
            alert("You have already voted this up")
        }
        else {
            alert("Voted this up")
            let item2 = {post_id, user_id}
            result = await fetch("http://localhost:8000/api/findpostvote", {
                method:'POST',
                body:JSON.stringify(item2), 
                headers:{
                    "Content-Type":'application/json',
                    "Accept":'application:json'
                }
            })
            result = await result.json()
            if(result.length>0) {
                let result2 = await fetch("http://localhost:8000/api/updatepostvote", {
                    method:'POST',
                    body:JSON.stringify(item), 
                    headers:{
                        "Content-Type":'application/json',
                        "Accept":'application:json'
                    }
                })
                result2 = await result2.json()
            }
            else {
                let result2 = await fetch("http://localhost:8000/api/addpostvote", {
                    method:'POST',
                    body:JSON.stringify(item), 
                    headers:{
                        "Content-Type":'application/json',
                        "Accept":'application:json'
                    }
                })
                result2 = await result2.json()
            }
        }
    }

    const down = async () => {
        let user_id = JSON.parse(localStorage.getItem('user-info')).id
        let vote = -1;
        let post_id = props.router.params.id
        let item = {user_id, post_id, vote}
        let result = await fetch("http://localhost:8000/api/findpostvote2", {
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
            alert("You have already voted this down")
        }
        else {
            alert("Voted this down")
            let item2 = {post_id, user_id}
            result = await fetch("http://localhost:8000/api/findpostvote", {
                method:'POST',
                body:JSON.stringify(item2), 
                headers:{
                    "Content-Type":'application/json',
                    "Accept":'application:json'
                }
            })
            result = await result.json()
            if(result.length>0) {
                let result2 = await fetch("http://localhost:8000/api/updatepostvote", {
                    method:'POST',
                    body:JSON.stringify(item), 
                    headers:{
                        "Content-Type":'application/json',
                        "Accept":'application:json'
                    }
                })
                result2 = await result2.json()
            }
            else {
                let result2 = await fetch("http://localhost:8000/api/addpostvote", {
                    method:'POST',
                    body:JSON.stringify(item), 
                    headers:{
                        "Content-Type":'application/json',
                        "Accept":'application:json'
                    }
                })
                result2 = await result2.json()
            }
        }
    }

    return(
        <div>
            <Header/>
            <h1>{data.title}</h1>
            <br/>
            <div style={{'font-family': '"Times New Roman", Times, serif', 'fontSize': '30px'}}>
                {data.content}
            </div>
            <div style={{marginTop: '50px'}}>
                <button onClick={up}>Vote up</button>
                <button onClick={down}>Vote down</button>
            </div>
            <div>
                <Comments postid={props.router.params.id}/>
            </div>
        </div>
    )
}

export default withRouter(Post)