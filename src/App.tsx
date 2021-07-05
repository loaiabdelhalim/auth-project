import * as React from 'react';
import './App.css';
import Login from './components/login/login'
import Register from './components/register/register'
import ResetPassword from './components/resetPassword/resetPassword'
import Items from './components/items/items'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    const userLoggedIn = localStorage.getItem('token')
    return (
        <>
            {userLoggedIn ? <Items/> : ''}
            <br/>
            <br/>
            <br/>
            <br/>
            {!userLoggedIn ? <ResetPassword/> : ''}
            <br/>
            <br/>
            <br/>
            <br/>
            {!userLoggedIn ? <Register/> : ''}
            <br/>
            <br/>
            <br/>
            <br/>
            {!userLoggedIn ? <Login/> : ''}
            <br/>
            <br/>
            <br/>
            <br/>
        </>
    );
}

export default App;
