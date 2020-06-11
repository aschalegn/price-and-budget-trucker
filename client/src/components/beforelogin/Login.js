import React, { useState, useContext } from 'react'
import axios from 'axios';
import { isLogedInContext } from '../../contexts/isLogedInContext';
import "./SigninLogin.css"
import { Button } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
export default function Login() {
    const [formData, setFormData] = useState();
    const [isLoged_in, setisLoged_in] = useState(false);
    const { user, userDispatch } = useContext(isLogedInContext);

    const changeHandler = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const loinUser = (e) => {
        e.preventDefault();
        axios.get(`user/login/${formData.email}/${formData.password}`)
            .then(res => {
                if (res.status === 200) {
                    localStorage.wiseUser = JSON.stringify(res.data);
                    setisLoged_in(true);
                    userDispatch({ type: "LOGIN_USER", payload: JSON.parse(localStorage.wiseUser) });
                }
            });
    }

    return (
        <section className="Login">
            {isLoged_in ? <Redirect to="/" /> : ''}
            <p>.</p>
            <form onSubmit={loinUser}>
                <div className="group">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" placeholder="E-mail" onChange={changeHandler} required />
                </div>
                <div className="group">
                    <label htmlFor="password">password</label>
                    <input type="password" id="password" name="password" placeholder="Password" onChange={changeHandler} required autoComplete="off" />
                </div>
                <Button type="submit"> Login</Button>
            </form>
        </section>
    );
}
