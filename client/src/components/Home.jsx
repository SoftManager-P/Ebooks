import { useState } from "react"
import axios from "axios"

const Home = ({books,setUpdate})=>{
    const [editbook,setEditbook] = useState(false)
    const [name,setName] = useState('')
    const [description,setDescription] = useState('')
    const [link,setLink] = useState('')
    const [bookId,setBookId] = useState(null)
    
    // /api/book/add

    const save = ()=>{
        if(name=='' || description=='' || link=='') return alert('All fields are required')
        axios.post('http://localhost:8000/api/book/add', {name,description,link},{headers:{'Authorization': `Bearer ${JSON.parse(window.localStorage.getItem('user'))?.token}`}})
        .then(data=>{
            if(data.data?.error) return alert('Error: ' + data.data?.error)
            setUpdate(true)
            reset()
        })
    }
    const deletebook = (id)=>{ 
        axios.post('http://localhost:8000/api/book/delete', {id},{headers:{'Authorization': `Bearer ${JSON.parse(window.localStorage.getItem('user'))?.token}`}})
        .then(data=>{
            if(data.data?.error) return alert('Error: ' + data.data?.error)
            setUpdate(true)
        })
    }

   const edit = ()=>{
    if(!bookId) return alert('Book not found')
    if(name=='' || description=='' || link=='') return alert('All fields are required')
        axios.post('http://localhost:8000/api/book/add', {name,description,link},{headers:{'Authorization': `Bearer ${JSON.parse(window.localStorage.getItem('user'))?.token}`}})
        .then(data=>{
            if(data.data?.error) return alert('Error: ' + data.data?.error)
            setUpdate(true)
            reset()
        })
   }
   
   const handlesubmit = ()=>{
    if(editbook) return edit()
    save()   
   }

   const reset = ()=>{
    setName('')
    setDescription('')
    setEditbook('')
    setEditbook(false)
    setBookId(null)
   } 

   const setCurrentBook = (book)=>{
    setName(book.name)
    setDescription(book.description)
    setLink(book.link)
    setEditbook(true)
    setBookId(book.id)
   }

    return (
        <div>
            <div>
                <input
                type="text"
                placeholder="book name"
                value={name}
                onChange={e=>setName(e.target.value)}
                /><br/>
                <input
                type="text"
                placeholder="book description"
                value={description}
                onChange={e=>setDescription(e.target.value)}
                /><br/>
                <input
                type="text"
                placeholder="book link"
                value={link}
                onChange={e=>setLink(e.target.value)}
                /><br/>

                <button onClick={handlesubmit}>{editbook?'Save changes':'Save'}</button>

            </div>
         <table>
            <tr>
                <th>Book name</th>
                <th>Description</th>
                <th>Link</th>
                <th></th>
            </tr>
            <tbody>
                {
                    books.map((book, i)=>(
                        <tr key={i}>
                           <td>{book.name}</td>
                           <td>{book.description}</td>
                           <td><a href={book.link}>{book.link}</a></td>
                           <td style={{display: 'flex'}}>
                            <button onClick={()=>setCurrentBook(book)}>Edit</button>
                            <button onClick={()=>deletebook(book.id)}>Delete</button>
                           </td>
                        </tr>
                    ))
                }
            </tbody>
         </table>
        </div>
    )
}

export default Home