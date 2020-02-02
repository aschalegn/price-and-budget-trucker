import React, { useState } from 'react'
import "../css/Tracker.css"
import axios from 'axios';
export default function Tracker() {
    const [formdata, setformdata] = useState(JSON.parse(localStorage.wiseUser));
    const changeHandler = (e) => {
        setformdata({ ...formdata, [e.target.name]: e.target.value });
    }
    const formHandler = (e) => {
        e.preventDefault();
        axios.post('tracker', formdata)
            .then(res => {
                console.log(res);
            })
    }

    return (
        <section className="Tracker">
            <h1>This Is the tracker page</h1>
            <form onSubmit={formHandler}>
                <div className="group">
                    <label htmlFor="title">Product Title</label>
                    <input type="text" id="title" name="title" onChange={changeHandler} required />
                </div>
                <div className="group">
                    <label htmlFor="url">Product URL</label>
                    <input type="url" id="url" name="url" onChange={changeHandler} required />
                </div>
                <div className="group">
                    <label htmlFor="currentPrice">Current price</label>
                    <input type="number" id="currentPrice" name="currentPrice" onChange={changeHandler} required />
                </div>
                <div className="group">
                    <label htmlFor="desiredPrice">Desired price</label>
                    <input type="number" id="desiredPrice" name="desiredPrice" onChange={changeHandler} required />
                </div>
                <input type="submit" value="Track Price" />
            </form>
        </section>
    );
}
