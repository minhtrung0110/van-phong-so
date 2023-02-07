import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Button, Col, Image, Modal} from "antd";
import Avatar from "react-avatar-edit";
import './style.scss'
import {FaCamera} from "react-icons/fa";
BoxAvatar.propTypes = {

};

function BoxAvatar(props) {
    const [src,setSrc]=useState('http://t0.gstatic.com/licensed-image?q=tbn:ANd9GcQTBIkxproxJHBsj2ZOkeFr3CYyVJjrfW8qcovw9whTrkRjsqYnBRlprpmyAknfOsug43oiT9iqS9cJe6s')
    const [preview,setPreview]=useState(null)
    const [isUpdateAvatar,setIsUpdateAvatar] = useState(false)
    const handleCrop=(view)=>{
      setPreview(view)
    }
    const handleClose=()=>{
        setPreview(null)
    }
    const handleUpload=()=>{
        !!preview && setSrc(preview)
        setIsUpdateAvatar(false)
    }
    const handleCancelUpload=()=>{
            setPreview(null)
        setIsUpdateAvatar(false)
    }
    const handleOpenPopupUpload=()=>{
        console.log(preview)
        setPreview(null)


        setIsUpdateAvatar(true)
    }

    const handleBeforeFileUpload=(elem)=>{
        if (elem.target.files[0].size > 9971680) {
            alert("File is too big!");
            elem.target.value = "";
        }
    }
    return (
        <Col className='box-avatar box' span={8}>
            <div className="container-img" onClick={handleOpenPopupUpload}>
                <img src={src} className='img-avatar' />
                    <div className="middle">
                        <FaCamera className='icon-camera' />
                    </div>
            </div>
            <div className="container-info">
                <p className='name'>Lê Văn Nguyên Tu</p>
                <span className='role'>Sale Person</span>
                <Button type="dashed" block>
                    Nhắn Tin
                </Button>
            </div>

            <Modal
                title="Thay Đổi Ảnh Đại Diện"
                open={isUpdateAvatar}
                onCancel={handleCancelUpload}
                onOk={handleUpload}
                okText="Cập Nhật"
                cancelText="Hủy Bỏ"
                okButtonProps={{
                    disabled: !!!preview,
                }}
            >
                <Avatar
                    width={470}
                    height={230}
                    onCrop={(view)=>setPreview(view)}
                    onClose={()=>setPreview(null)}
                    onBeforeFileLoad={handleBeforeFileUpload}
                    src={null}

                />
            </Modal>

        </Col>
    );
}

export default BoxAvatar;