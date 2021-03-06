import React, { useState, useContext } from 'react'
import Axios from 'axios';
import { userContext } from '../../../contexts/userContext';
import "../SigninLogin.css";
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function SignUp() {
    const [formData, setFormData] = useState();
    const { dispach } = useContext(userContext);
    const [isExist, setIsExist] = useState(false);

    const changeHandler = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const signUser = (e) => {
        e.preventDefault();
        Axios.post("user/signin", formData)
            .then(res => {
                if (res.status === 303) {
                    setIsExist(true)
                }
                else if (res.status === 200) {
                    dispach({ type: "", payload: res.data });
                }
            });
    }

    return (
        <section className="Signin">
            <p>.</p>
            <form onSubmit={signUser}>
                <h3 className="text-center">Create your new user</h3>
                <div className="group">
                    <label htmlFor="fullName">Full Name</label>
                    <input type="text" id="fullName" name="fullName" placeholder="Full Name" onChange={changeHandler} required />
                </div>
                <div className="group">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" placeholder="email" onChange={changeHandler} required />
                </div>
                <div className="group">
                    <label htmlFor="password">password</label>
                    <input type="password" id="password" name="password" placeholder="password" onChange={changeHandler} required autoComplete="off" />
                </div>
                <div className="group">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input type="password" id="confirmPassword" name="confirmPassword" placeholder="Confirm password" onChange={changeHandler} required autoComplete="off" />
                </div>
                <Button type="submit" className="center-block">Sign IN </Button>
                {isExist ?
                    <div>
                        <h3>user exists pleas try to <Link to="/login">login</Link></h3>
                    </div> 
                    : ''}
            </form>
        </section>

    )
}
