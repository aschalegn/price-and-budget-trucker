import React, { useState, useContext } from 'react'
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import { userContext } from '../../../contexts/userContext';
import "../SigninLogin.css";

export default function Login() {
    const [formData, setFormData] = useState();
    const { userDispatch, userStatus } = useContext(userContext);

    const changeHandler = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const submitHandler = (e) => {
        e.preventDefault();
        axios.get(`/user/login`, { params: formData })
            .then(res => {
                console.log(res);
                if (res.status === 200) {
                    console.log(res.data);
                    localStorage.wiseUser = JSON.stringify(res.data);
                    userDispatch({ type: "LOGIN_USER", payload: res.data });
                }
            });
    }

    return (
        <section className="Login">
            {userStatus.isLogegedIn ? <Redirect to="/" /> : ''}
            <p>.</p>
            <form onSubmit={submitHandler}>
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
