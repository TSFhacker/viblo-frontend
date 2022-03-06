import {useState, useEffect} from 'react';
import './Comment.css'
import CommentForm from './CommentForm';

function Comments(props) {
  const [change, setChange] = useState(true)
  const [comment, setComment] = useState([])
  useEffect(async ()=>{
    let post_id = props.postid
    let item = {post_id}
    //console.log(item)
    let result = await fetch("http://localhost:8000/api/comment", {
            method:'POST',
            body:JSON.stringify(item), 
            headers:{
                "Content-Type":'application/json',
                "Accept":'application:json'
            }
        })
        result = await result.json()
        setComment(result)
  }, [])


  const up = async (comment_id) => {
    let user_id = JSON.parse(localStorage.getItem('user-info')).id
    let vote = 1;
    console.log(comment_id)
    let item = {user_id, comment_id, vote}
    let result = await fetch("http://localhost:8000/api/findcommentvote2", {
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
        let item2 = {comment_id, user_id}
        result = await fetch("http://localhost:8000/api/findcommentvote", {
            method:'POST',
            body:JSON.stringify(item2), 
            headers:{
                "Content-Type":'application/json',
                "Accept":'application:json'
            }
        })
        result = await result.json()
        if(result.length>0) {
            let result2 = await fetch("http://localhost:8000/api/updatecommentvote", {
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
            let result2 = await fetch("http://localhost:8000/api/addcommentvote", {
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
    window.location.reload(false)
}

  const down = async (comment_id) => {
    let user_id = JSON.parse(localStorage.getItem('user-info')).id
    let vote = -1;
    let item = {user_id, comment_id, vote}
    let result = await fetch("http://localhost:8000/api/findcommentvote2", {
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
        let item2 = {comment_id, user_id}
        result = await fetch("http://localhost:8000/api/findcommentvote", {
            method:'POST',
            body:JSON.stringify(item2), 
            headers:{
                "Content-Type":'application/json',
                "Accept":'application:json'
            }
        })
        result = await result.json()
        if(result.length>0) {
            let result2 = await fetch("http://localhost:8000/api/updatecommentvote", {
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
            let result2 = await fetch("http://localhost:8000/api/addcommentvote", {
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
    window.location.reload(false)
  }
  const addComment = async (text) => {
    let content = text
    let post_id = props.postid
    let user_id = JSON.parse(localStorage.getItem('user-info')).id
    let vote = 0
    let item = {post_id, user_id, content, vote}
    //console.log(item)
    let result = await fetch("http://localhost:8000/api/createcomment", {
            method:'POST',
            body:JSON.stringify(item), 
            headers:{
                "Content-Type":'application/json',
                "Accept":'application:json'
            }
        })
    result = await result.json()
    setComment([...comment, result])
    console.log(comment)
    // console.log(result)
    window.location.reload(false)
  }

  return (
      <div className='comments'>
        <h3 className='comments-title'>Comments</h3>
        <div className='comment-form-title'>Write comment</div>
        <CommentForm submitLabel="Write" handleSubmit={addComment}/>
        <div className='comments-container'>
            {
              comment.map((item)=>
              <div className='comment'>
                <div className='comment-image-container'>
                  <img src='index.jpeg'/>
                  <br/>
                  <span>{item.vote}</span>
                </div>
                <div className='comment-right-part'>
                  <div className='comment-content'>
                    <div className='comment-author'>{item.name}</div>
                    <div>{item.created_at}</div>
                  </div>
                  <div className='comment-text'>{item.content}</div>
                  <button onClick={()=>up(item.cmtid)}>Up</button>
                  <button onClick={()=>down(item.cmtid)}>Down</button>
                </div>
              </div>
              )}
        </div>
      </div>
    )
  }
  
  export default Comments;
  