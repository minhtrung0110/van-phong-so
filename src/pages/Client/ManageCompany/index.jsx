import React, {useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import ImgCrop from 'antd-img-crop';
import './style.scss'
import HeaderContent from "~/components/commoms/HeaderContent";
import Avatar from "react-avatar-edit";
import {Upload} from "antd";
import ImageCustom from "~/components/commoms/Image";
ManageCompany.propTypes = {

};
const data={
    name:'NextGen Company',
    avatarUrl: 'https://i.vimeocdn.com/video/783884431-352c9f924cc85d5b9137038a677deb6fcf0a6f806631ef28571776eaa0a3fa17-d_1920x1080?r=pad'
}
function ManageCompany() {
    const [showEdit,setShowEdit]=useState(false)
    const [company,setCompany]=useState(data)
    const [name,setName]=useState(company.name)
    const [avatar,setAvatar]=useState({
        uid: '-1',
        name: 'image.png',
        status: 'done',
        url: company.avatarUrl,
    })
    console.log(showEdit)
    const selectAllInlineTex = (e) => {
        e.target.focus();
        // e.target.select()
    }
    const inputRef=useRef()
    const handleShowEditName = ()=>{
        setShowEdit(true);
      setTimeout(()=>inputRef.current.focus(),10);
    }
    useEffect(()=>{
        console.log('Update Name Company: ',name)
    },[name])

    const onChange = ({ fileList: newFileList }) => {
        setAvatar(newFileList);
    };
    const onPreview = async (file) => {
        let src = file.url;
        if (!src) {
            src = await new Promise((resolve) => {
                const reader = new FileReader();
                reader.readAsDataURL(file.originFileObj);
                reader.onload = () => resolve(reader.result);
            });
        }
        const image = new Image();
        image.src = src;
        const imgWindow = window.open(src);
        imgWindow?.document.write(image.outerHTML);
    };

    return (
        <div className='container-setting'>
            <HeaderContent title={'Thông tin tổ chức'} />
            <div className='box-title'>
                <div className='header'>
                    <span>Tên Tổ Chức</span>
                    <div className='editor'>
                        <button type='button' className={`btn-edit ${showEdit?'hidden':''}`}
                                onClick={handleShowEditName}
                        >Chỉnh sửa</button>
                        {
                            !!showEdit && (
                                <div className='group-edit'>
                                    <button type='button' className={`btn-cancel`}
                                            onClick={()=>setShowEdit(false)}
                                    >Hủy</button>
                                    <button type='button' className={`btn-save`}
                                            onClick={()=>setShowEdit(false)}
                                    >Lưu</button>
                                </div>
                            )
                        }
                    </div>
                </div>
                <div className='group-input'>
                    {
                        !!showEdit ?(
                            <input className={`input-editable ${showEdit?'active':''}`}
                                   value={name}
                                   ref={inputRef}
                                   onChange={e=>setName(e.target.value)}
                                   onClick={selectAllInlineTex}
                            />
                        ):(
                            <div className='name'>{company.name}</div>
                        )
                    }

                </div>

            </div>
            <div className='box-avatar'>
                <div className='header'>
                    <span>Logo Tổ Chức</span>
                </div>
                <div className='avatar'>
                    {
                        showEdit ?(
                            <ImgCrop rotationSlider>
                                <Upload
                                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                    listType="picture-card"
                                    fileList={avatar}
                                    onChange={onChange}
                                    maxCount={1}
                                    onPreview={onPreview}
                                >
                                    <div className='btn-upload'>
                                        Tải Lên
                                    </div>
                                </Upload>
                            </ImgCrop>
                        ):(
                            <ImageCustom src={company.avatarUrl} className={'image-logo'}/>
                        )
                    }
                </div>
            </div>
        </div>
    );
}

export default ManageCompany;