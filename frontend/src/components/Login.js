import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const Login = (props) => {
    const [credentials, setCredentials] = useState({email: "", password: ""})
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log("Request Data:", { email: credentials.email, password: credentials.password });
        const response = await fetch("https://rapid-recall-backend.vercel.app/api/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: credentials.email, password: credentials.password})
        });
        const json = await response.json()
        // console.log("Response Data:", json);
        // console.log(json);
        if (json.success){
            // Save the auth token and redirect
            localStorage.setItem('token', json.authtoken);
            navigate("/");
            props.showAlert("Logged In Successfully", "success");

        }
        else{
            props.showAlert("Invalid Details", "danger");
        }
    }

    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }

    return (
        <div>
            <div className="container login mt-3" style={{paddingBottom: "90px"}}>
            <form  onSubmit={handleSubmit}>
            <h2 className="mt-3" style={{textAlign: "center",fontFamily:"cursive"}}>Secure Login !</h2>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control borderx" value={credentials.email} placeholder="Enter Your Email" onChange={onChange} id="email" name="email" aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text"></div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control borderx" value={credentials.password} placeholder="Enter Your Password" onChange={onChange} name="password" id="password" />
                </div>

                <button type="submit" className="btn btn-dark my-3">Submit</button>
            </form>
            </div>
        </div>
    )
}

export default Login