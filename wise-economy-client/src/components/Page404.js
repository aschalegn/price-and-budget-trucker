import React from 'react'
import { Link } from 'react-router-dom'

export default function Page404() {
    return (
        <div>
            <h2>Looks You Get Lost</h2>
            <h3><Link to="/">Go Home</Link></h3>
        </div>
    );
}
