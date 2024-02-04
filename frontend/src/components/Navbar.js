import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
    let navigate = useNavigate();
    const handleLogout = ()=>{
        localStorage.removeItem("token");
        navigate("/login");
    }
    let location = useLocation();
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark font fixed-top">
  <div className="container-fluid">
  <img className='mx-2' src="/77.png" alt="Logo" height="30" />
    <Link className="navbar-brand" to="#"> RapidRecall</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname==="/"?"active":""}`} aria-current="page" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname==="/about"?"active":""}`} to="/about">About</Link>
        </li>
      </ul>
        {!localStorage.getItem("token") ? <form>
        <Link className="btn btn-outline-secondary mx-3 i" to="/signup" type="submit">Sign Up</Link>
        <Link className="btn btn-outline-secondary i" to="/login" type="submit">Log in</Link>
        </form>: <button onClick={handleLogout} className="btn btn-outline-secondary i">Log out</button>}
    </div>
  </div>
</nav>
    </div>
  )
}

export default Navbar