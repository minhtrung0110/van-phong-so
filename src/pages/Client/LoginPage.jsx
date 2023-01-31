import React from 'react';
import Avatar from '~/asset/images/avatar_login_client.svg'
import Bg from '~/asset/images/bg_login_client.svg'
import Wave from '~/asset/images/wave_login_client.png'
import './style.scss'
function LoginPage(props) {
    return (
        <div className="container">
            <div className="design">
                <div className="pill-1 rotate-45"></div>
                <div className="pill-2 rotate-45"></div>
                <div className="pill-3 rotate-45"></div>
                <div className="pill-4 rotate-45"></div>
            </div>
            <div className="login">
                <h3 className="title">User Login</h3>
                <div className="text-input">
                    <i className="ri-user-fill"></i>
                    <input type="text" placeholder="Username"/>
                </div>
                <div className="text-input">
                    <i className="ri-lock-fill"></i>
                    <input type="password" placeholder="Password"/>
                </div>
                <button className="login-btn">LOGIN</button>
                <a href="#" className="forgot">Forgot Username/Password?</a>
                <div className="create">
                    <a href="#">Create Your Account</a>
                    <i className="ri-arrow-right-fill"></i>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;