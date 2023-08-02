import React,{useEffect} from 'react'
import { Outlet, Link, useLocation,useNavigate } from "react-router-dom";

const Navbar = () => {
    let history=useNavigate()
    const handleLogout=()=>{
        localStorage.removeItem('token')
        history('/login')
    }
    let location = useLocation();
    useEffect(() => {
      
      }, [location]);
    return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <Link className="navbar-brand" to="/">Notebook</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className={`nav-item ${location.pathname==='/'?"active":''} ` }>
                            <Link className="nav-link" to="/">Home </Link>
                        </li>
                        <li className={`nav-item ${location.pathname==='/about'?"active":''} ` }>
                            <Link className="nav-link"to="/about">About</Link>
                        </li>


                    </ul>
                    {!localStorage.getItem("token")?
                    <form className="form-inline my-2 my-lg-0">
                        
                        <Link to="/login"  className="btn btn-primary mx-2">Login</Link>
                        <Link to="/signup"  className="btn btn-primary" >SignUp</Link>
                    </form>:
                    <button className='btn btn-primary' onClick={handleLogout}>Logout</button>}
                </div>
                <Outlet/>
            </nav>

        
    )
}

export default Navbar