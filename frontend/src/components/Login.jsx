import { useState } from "react";
import { useNavigate } from "react-router-dom";
const host="https://inotebook-backend-5w3y.onrender.com"
const Login = (props) => {
    const [credentials, setCredentials] = useState({
        email:"", password: ""
    });
    let history=useNavigate()

    const onchange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`${host}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });
        const json = await response.json();
        console.log(json)
        if (json.success) {
            //save the auth token and redirect
            localStorage.setItem('token', json.authtoken)
            props.showAlert("Welcome to Notebook","success")
            history('/')
        }
        else {
            props.showAlert("Check your mail or password","danger")
        }
    }
    return (
        <div className="container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input type="email" onChange={onchange} value={credentials.email} className="form-control" id="email" name="email" aria-describedby="emailHelp" placeholder="Enter email" />
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" onChange={onchange} value={credentials.password} name="password" className="form-control" id="password" placeholder="Password" />
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}
export default Login