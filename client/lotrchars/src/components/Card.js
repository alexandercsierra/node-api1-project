import React, {useState} from 'react'
import axios from 'axios'

export default function Card(props) {
    const {char, deleteChar} = props;

    const [chars, setChars] = useState([]);
  const [add, setAdd] = useState(false);
  const [newChar, setNewChar] = useState({
    name:'',
    bio:''
  })


  const onChange = e => {
    setNewChar({
      ...newChar,
      [e.target.name]: e.target.value
    })
  }

    const editChar = e => {
        e.preventDefault();
        console.log(typeof e.target.id);
        axios.put(`http://localhost:5000/api/users/${Number(e.target.id)}`, newChar)
          .then(res=>console.log(res))
          .catch(err=>console.log(err))
          setEdit(false);
      }

    const [edit, setEdit] = useState(false);
    return (
        <div key={char.id}>
            <h2>{char.name}</h2>
            <p>{char.bio}</p>
            <button onClick={deleteChar} id={char.id}>delete</button>
            <button onClick={()=>{
                setEdit(!edit)
                setNewChar(char);
            }}>edit</button>
            {edit && <form id={char.id} onSubmit={editChar}>
              <input name='name' placeholder='name' value={newChar.name} onChange={onChange}/>
              <input name='bio' placeholder='bio' value={newChar.bio} onChange={onChange}/>
              <button id={char.id}>Submit</button>
            </form>}
          </div>
    )
}
