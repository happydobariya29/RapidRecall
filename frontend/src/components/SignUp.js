import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignUp = (props) => {
  const [credentials, setCredentials] = useState({name:"", email: "", password: "",cpassword:""})
    let navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const {name,email,password,cpassword} =credentials;
    if (password !== cpassword) {
      props.showAlert("Passwords does not match", "danger");
      return;
  }
    const response = await fetch("https://rapid-recall-backend.vercel.app/api/auth/createuser", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({name,email,password})
    });
    const json = await response.json()
    // console.log("Response Data:", json);
    // console.log(json);
    if (json.success) {
      // Save the auth token and redirect
      localStorage.setItem('token', json.authtoken);
      navigate("/");
      props.showAlert("Account Created Successfully", "success");
    }
    else{
      props.showAlert("User with this email already exist", "danger");
    }
    
}

const onChange = (e)=>{
    setCredentials({...credentials, [e.target.name]: e.target.value})
}
  return (
    <div className="container" style={{paddingBottom: "110px"}}>
       <div className="container login mt-3">
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <h2 className="mt-3" style={{textAlign: "center",fontFamily:"cursive"}}>Ready to Explore? Sign Up Now!</h2>
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control borderx" value={credentials.name} placeholder="Enter Your Name" onChange={onChange} id="email" name="name"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control borderx" value={credentials.email} placeholder="Enter Your Email" onChange={onChange} id="email" name="email" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control borderx" value={credentials.password} placeholder="Enter Your Password" onChange={onChange} name="password" id="password" minLength={5} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control borderx" value={credentials.cpassword} placeholder="Confirm Password" onChange={onChange} name="cpassword" id="cpassword" minLength={5} required />
                </div>

                <button type="submit" style={{textAlign: "center!important"}} className="btn btn-dark my-3 mx-auto">Create Account</button>
            </form>
            </div>
    </div>
  )
}

export default SignUp
