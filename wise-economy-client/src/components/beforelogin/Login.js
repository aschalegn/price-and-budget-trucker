import React, { useState, useContext } from 'react'
import axios from 'axios';
import { isLogedInContext } from '../../contexts/isLogedInContext';
import "../css/SigninLogin.css"
import { Button } from 'react-bootstrap';
export default function Login() {
    const [formData, setFormData] = useState();
    const { dispatch } = useContext(isLogedInContext);

    const changeHandler = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const loinUser = (e) => {
        axios.get(`user/login/${formData.email}/${formData.password}`)
            .then(res => {
                if (res.status === 200) {
                    localStorage.wiseUser = JSON.stringify(res.data);
                    dispatch({ type: "LOGIN_USER", payload: res.data });
                }
            });
    }

    return (
        <section className="Login">
            <p>.</p>
            <form>
                <div className="group">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" placeholder="E-mail" onChange={changeHandler} required />
                </div>
                <div className="group">
                    <label htmlFor="password">password</label>
                    <input type="password" id="password" name="password" placeholder="Password" onChange={changeHandler} required autoComplete="off" />
                </div>
                <Button onClick={loinUser}> Login</Button>
            </form>
        </section>
    );
}
