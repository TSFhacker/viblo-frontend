import {useNavigate} from 'react-router-dom'
import {useEffect} from 'react'

function Default()
{
    const navigate=useNavigate();

    useEffect(()=>{
        if(localStorage.getItem('user-info'))
        {
            navigate("/main")
        }
        else navigate("/login")
    }, [])

    return(
        <div>Hello world</div>
    )
}

export default Default