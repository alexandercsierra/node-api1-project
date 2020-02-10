import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios'
import Card from './components/Card'

function App() {
  const [chars, setChars] = useState([]);
  const [add, setAdd] = useState(false);
  const [newChar, setNewChar] = useState({
    name:'',
    bio:''
  })

  useEffect(()=>{
    axios.get('http://localhost:5000/api/users')
      .then(res=>setChars(res.data))
      .catch(err=>console.log(err))
  },[])


  const onChange = e => {
    setNewChar({
      ...newChar,
      [e.target.name]: e.target.value
    })
  }

  const addOnSubmit = e => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/users', newChar)
      .then(res=>setAdd(false))
      .catch(err=>console.log(err))
    setNewChar({
      id: '',
      name:'',
      bio:''
    })
  }

  const deleteChar = e => {
    e.preventDefault();
    axios.delete(`http://localhost:5000/api/users/${e.target.id}`)
      .then(res=>console.log(res))
      .catch(err=>console.log(err))
  }

  

  return (
    <div className="App">
      <button onClick={()=>setAdd(!add)}>Add</button>
      {add && <form onSubmit={addOnSubmit}>
        <input name='name' placeholder='name' value={newChar.name} onChange={onChange}/>
        <input name='bio' placeholder='bio' value={newChar.bio} onChange={onChange}/>
        <button>Submit</button>
      </form>}
      {chars && chars.map(char=>{
        return(
          <Card char={char} deleteChar={deleteChar} onSubmit={addOnSubmit} onChange={onChange}/>
        )
      })}
    </div>
  );
}


export default App;
