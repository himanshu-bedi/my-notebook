import { useState } from "react"
import { useNavigate } from "react-router-dom";
const host="https://inotebook-backend-5w3y.onrender.com"
const Signup = (props) => {
    const [credentials, setCredentials] = useState({
       name:"", email:"", password: "",cpassword:""
    });
    const onchange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    let history=useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`${host}/api/auth/createUser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name:credentials.name, email: credentials.email, password: credentials.password })
        });
        const json = await response.json();
        console.log(json)
        if (json.success) {
            localStorage.setItem('token', json.authtoken)
            history('/')
            props.showAlert("Account created sucessfully!!. Welcome to Notebook","success")
        }
        else {
            props.showAlert("Invalid credentials","danger")
        }
    }
    return (
        <div className="container">
            <h2>SignUp</h2>
            <form onSubmit={handleSubmit}>
            <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" className="form-control" value={credentials.name} id="name" name="name" aria-describedby="emailHelp" placeholder="Enter your Name" onChange={onchange} minLength={5} required/>
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input type="email" className="form-control" id="email" name="email"  value={credentials.email} onChange={onchange} aria-describedby="emailHelp" placeholder="Enter email" required/>
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" id="password" name="password"  value={credentials.password} placeholder="Password" onChange={onchange} minLength={5} required/>
                </div>
                <div className="form-group">
                    <label htmlFor="confirmpassword">Confirm Password</label>
                    <input type="password" className="form-control" id="confirmpassword" name="cpassword" 
                     value={credentials.cpassword}placeholder="Confirm Password" onChange={onchange} minLength={5} required/>
                </div>
                
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}
export default Signup