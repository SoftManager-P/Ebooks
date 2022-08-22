import './App.css';
import { useEffect, useState } from "react"
import Login from './components/Login';
import Home from './components/Home';
import axios from "axios"


function App() {
  const [auth, setAuth] = useState(false)
  const [update, setUpdate] = useState(true)
  const [user, setUser] = useState({})
  const [books, setBooks] = useState([])
  
  useEffect(()=>{
   let userdata = JSON.parse(window.localStorage.getItem('user'))
   if(userdata?.token){
      setAuth(true)
      setUser(userdata)
   }
  },[])


  useEffect(()=>{
   if(!auth || !update) return
    axios.get('http://localhost:8000/api/books',{Headers:{'Authorization': `Bearer ${user.token}`}})
    .then(data=>setBooks(data.data))
    setUpdate(false)
  },[auth,update])

const logout = ()=>{
  window.localStorage.setItem('user',null)
  setAuth(false)
}

  return (
    <>
    {
      auth
      ?
      <>
      <h4 style={{display: 'flex',width:'100px'}}>Welcom {user.user.email} <button onClick={logout}>Logout</button></h4> <hr/><br/>
      <Home books={books} setUpdate={setUpdate}/>
      </>
      :
      <Login setAuth={setAuth}/>
    }
    </>
  );
}

export default App;
