import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Col, Image} from "antd";
import Avatar from "react-avatar-edit";
import './style.scss'
BoxAvatar.propTypes = {

};

function BoxAvatar(props) {
    const [src,setSrc]=useState()
    const [preview,setPreview]=useState()
    const handleCrop=(view)=>{
      setPreview(view)
    }
    const handleClose=()=>{
        setPreview(null)
    }
    const handleBeforeFileUpload=()=>{

    }
    return (
        <Col className='box-avatar box' span={8}>
            <Avatar
                width={210}
                height={170}
                onCrop={handleCrop}
                onClose={handleClose}
                onBeforeFileLoad={handleBeforeFileUpload}
                src={src}
            />
            {
                !!preview &&   <img src={src} alt={preview}/>
            }
        </Col>
    );
}

export default BoxAvatar;