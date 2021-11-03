import { useState } from 'react';
import Students from './components/Students.js';

function App() {

  const admin = {username: "admin", password: "qwerty"};

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [authorize, setAuthorize] = useState(false);

  const handleUsernameChange = e => {
      setUsername(e.target.value);
  }
  const handlePasswordChange = e => {
      setPassword(e.target.value);
  }

  const checkUser = e =>{
    if(admin.username == username && admin.password == password){
      setAuthorize(true);
    }else{
      alert("TRY AGAIN!");
    }
  }

  return (
    <div>
      {authorize ? 
        <div>
          <Students />
        </div>
        
        :

        <div style={{backgroundColor: '#9867C5', height: '764px'}}>
          <div className='col-8 mx-auto d-flex justify-content-center text-white'>
            <div style={{marginTop: '250px'}}>
                <label>Username:</label>
                <input type='text' className='mt-2 form-control' onChange={handleUsernameChange} required/>
                <label className='mt-2'>Password:</label>
                <input type='password' className='mt-2 form-control' onChange={handlePasswordChange} required/>
                <button type='button' className='btn btn-primary mt-3 form-control' onClick={checkUser}>Log in</button> 
            </div>
          </div>
        </div>
      } 
    </div>
  );
}

export default App;
