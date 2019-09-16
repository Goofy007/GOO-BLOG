import React, { useState } from 'react'
import axios from 'axios';

const Login = (props) => {
  const [username, setUser] = useState('')
  const [password, setPassword] = useState('')
  const handleLogin = async() => {
    const re = await axios.post('http://localhost:3010/api/users/login',{
      username:username,
      password:password
    });
    if(re.data.errno === 0) {
      localStorage.setItem("user_token",re.data.data.token)
      localStorage.setItem("author",username)
      props.history.push('/')
    }
  }

  return (
    <div className="container">
      <div className="login">
        <form>
          <div className="form-group">
            <label>username</label>
            <input onChange={(e) => {
              setUser(e.target.value)
            }} className="form-control"
              id="username"
              placeholder="username" />
          </div>
          <div className="form-group">
            <label>password</label>
            <input
              onChange={(e) => {
                setPassword(e.target.value)
              }}
              type="password" className="form-control"
              id="password"
              placeholder="passsword" />
          </div>
          <button onClick={handleLogin}  className="btn btn-primary">Login</button>
        </form>
      </div>
    </div>
  )

}


export default Login;
