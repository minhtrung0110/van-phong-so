import React from 'react';
import Avatar from '~/asset/images/avatar_login_client.svg'
import Bg from '~/asset/images/bg_login_client.svg'
import Wave from '~/asset/images/wave_login_client.png'
import './style.scss'
function LoginPage(props) {
    return (
        <>
            <img className="wave" src={Wave}  alt='Wave'/>
                <div className="container">
                    <div className="img">
                        <img src={Bg}/>
                    </div>
                    <div className="login-content">
                        <form action="index.html">
                            <img src={Avatar}/>
                                <h2 className="title">Welcome</h2>
                                <div className="input-div one">
                                    <div className="i">
                                        <i className="fas fa-user"></i>
                                    </div>
                                    <div className="div">
                                        <h5>Username</h5>
                                        <input type="text" className="input"/>
                                    </div>
                                </div>
                                <div className="input-div pass">
                                    <div className="i">
                                        <i className="fas fa-lock"></i>
                                    </div>
                                    <div className="div">
                                        <h5>Password</h5>
                                        <input type="password" className="input"/>
                                    </div>
                                </div>
                                <a href="#">Forgot Password?</a>
                                <input type="submit" className="btn" value="Login"/>
                        </form>
                    </div>
                </div>
        </>
    );
}

export default LoginPage;