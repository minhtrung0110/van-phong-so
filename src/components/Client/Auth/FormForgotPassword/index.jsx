import React, {useState} from 'react';
import PropTypes from 'prop-types';
import ImageCustom from "~/components/commoms/Image";
import wave from "~/asset/images/wave.png";
import iconBG from "~/asset/images/icon_loginv4.png";
import avatar from "~/asset/images/avatar.svg";
import {FaLock, FaUser} from "react-icons/fa";
import './style.scss'
import {useForm} from "react-hook-form";
import {message} from "antd";
import FormEmail from "~/components/Client/Auth/FormForgotPassword/FormEmail";
import FormOTP from "~/components/Client/Auth/FormForgotPassword/FormOTP";
import FormChangePassword from "~/components/Client/Auth/FormForgotPassword/FormChangePassword";
ForgotPassword.propTypes = {

};

function ForgotPassword(props) {
    const {register, handleSubmit, watch, formState: {errors}} = useForm();
    const [isEmail,setIsEmail] = useState(true)
    const [isCorrectOTP,setIsCorrectOTP] = useState(false)
    const [isFocusedEmail, setIsFocusedEmail] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();
    const onSubmit=(data) => {
    }
    return (
     <>
         {
             isEmail?(
                 isCorrectOTP ?(<FormChangePassword />):(
                     <FormOTP onCorrectOTP={setIsCorrectOTP}/>
                     )

             ):(
                <FormEmail onIsmail={setIsEmail} />
             )
         }
     </>
    );
}

export default ForgotPassword;