import axios from "axios"
import { useState } from "react"


const Login = ({setAuth})=>{
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')


    const loginuser = ()=>{
        if(!email.trim() || !password.trim()) return alert('Email and password is required')
        axios.post('http://localhost:8000/api/login',
        {email,password}
        )
        .then(data=>{
            if(data.data.error) return alert(data.data.error)
            window.localStorage.setItem('user', JSON.stringify(data.data))
            setAuth(true)
        })

    }

    return (
        <div style={{width:'400px'}}>
         <input
           type="Email"
           placeholder="Email"
           onChange={(e)=>setEmail(e.target.value)}
          /> <br />
         <input
           type="password"
           placeholder="Password"
           onChange={(e)=>setPassword(e.target.value)}
           /> <br />
         <button onClick={loginuser}>Login</button>
        </div>
    )
}

export default Login