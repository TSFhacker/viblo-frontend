import Header from "./Header.jsx"
import {useState} from 'react'
import './AddPost.css'

function AddPost()
{


    async function addPost()
    {
        let user_id = JSON.parse(localStorage.getItem("user-info")).id
        if(title.length===0||content.length===0||slug.length===0)
        {
            alert ("Please fill all the required area")
        }
        else 
        {
            const formData = new FormData()
            formData.append('title', title)
            formData.append('slug', slug)
            formData.append('content', content)
            formData.append('user_id', user_id)
            formData.append('vote', 0)

            await fetch("http://localhost:8000/api/addpost", {
                method:'POST',
                body:formData
            })
            alert("Data have been saved")
        }
    }
    const [title, setTitle] = useState("")
    const [slug, setSlug] = useState("")
    const [content, setContent] = useState("")
    return(
        <div>
            <Header/>
            <div className="col-sm-6 offset-sm-3">
                <br/>
                <input type="text" className="form-control" value={title} onChange={(e)=> setTitle(e.target.value)} placeholder="title"/>
                <input type="text" className="form-control" value={slug} onChange={(e)=> setSlug(e.target.value)} placeholder="slug"/>
                <input type="text" className="form-control" value={content} onChange={(e)=> setContent(e.target.value)} placeholder="content" style={{height: "250px"}} />
                <button onClick={addPost} className="btn btn-primary">Add post</button>                
            </div>
        </div>
    )
}

export default AddPost