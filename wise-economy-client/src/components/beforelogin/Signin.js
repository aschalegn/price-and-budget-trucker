import React, { useState, useContext } from 'react'
import Axios from 'axios';
import { isLogedInContext } from '../../contexts/isLogedInContext';

export default function Signin() {
    const [formData, setFormData] = useState();
    const { dispach } = useContext(isLogedInContext);

    const changeHandler = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const signUser = (e) => {
        e.preventDefault();
        Axios.post("user/signin", formData)
            .then(res => {
                if (res.status === 200) {
                    dispach({ type: "", payload: res.data });
                }
            });
    }
    
    return (
        <form className="Signin" onSubmit={signUser}>
            <div className="group">
                <label htmlFor="title">Full Name</label>
                <input type="text" id="title" name="title" onChange={changeHandler} required />
            </div>
            <div className="group">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" onChange={changeHandler} required />
            </div>
            <div className="group">
                <label htmlFor="password">password</label>
                <input type="password" id="password" name="password" onChange={changeHandler} required autoComplete="off" />
            </div>
            <div className="group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input type="password" id="confirmPassword" name="confirmPassword" onChange={changeHandler} required autoComplete="off" />
            </div>
            <input type="submit" value="Sign IN" />
        </form>
    )
}
