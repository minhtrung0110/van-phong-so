import React, {useState} from 'react';
import PropTypes from 'prop-types';
import './style.scss'
import AvatarCustom from "~/components/commoms/AvatarCustom";
import { Modal, Upload} from "antd";
import {FaCaretDown, FaPaperclip} from "react-icons/fa";
import CustomEditor from "~/components/commoms/Edittor";
import {isEmpty} from "lodash";
AddPost.propTypes = {

};

function AddPost({author,onSave}) {
    const [showAdd,setShowAdd]=useState(false)
    const [errorDescription, setErrorDescription] = useState('');
    const [description,setDescription] = useState('')
    const [listFile, setListFile] = useState([])
    const editorDescription = (value) => {
        setDescription(value);
        setErrorDescription('');
    };
    const handleChangeUpload = (info) => {
        setListFile(info.fileList)
    }
    const handleHiddenListFile = () => {
        const elements = document.querySelector('.attach-file .ant-upload-list');
        const icon = document.querySelector('.attach-file .title-upload .icon');

        if (elements.style.display !== 'none') {
            elements.style.display = 'none';
            icon.classList.toggle('rotate');
        } else {
            elements.style.display = 'block';
            icon.classList.toggle('rotate');
        }
    }
    const handleSubmit=() => {
        const result={
            description,
            listFile
        }
        onSave(result)
        setDescription('')
        setListFile([])
        setShowAdd(false)

    }
    return (
        <div className='create-post-container'>
           <div className='post-item-create'>
               <div className='post-head'>
                   <div className='post-user'>
                       <AvatarCustom lastName={author.last_name} avatar={author.avatar} className={'post-avatar'} />
                   </div>
                   <div className={'post-input'} onClick={()=>setShowAdd(true)}>
                       {author.last_name} ơi ! Bạn đang nghĩ gì thế ?
                   </div>

               </div>
           </div>
            <Modal title="" open={showAdd}
                   maskClosable={true}
                   destroyOnClose={true}
                   onCancel={()=>setShowAdd(false)}
                   footer={null}
                   width={700}
                   style={{top: 50}}
            >
                <div className={'form-create-post'}>
                    <div className='post-head'>
                        <div className='post-user'>
                            <AvatarCustom lastName={author.last_name} avatar={author.avatar} className={'post-avatar'} />
                        </div>
                        <span className={'post-name-author'}>
                            {`${author.first_name} ${author.last_name}`}
                        </span>

                    </div>
                    <div className='post-content'>
                        <CustomEditor id="description" editorDescription={editorDescription}/>
                        <div className='attach-file'>
                            <Upload
                                action="http://localhost:3000/"
                                listType="picture"
                                fileList={listFile}
                                multiple
                                onChange={handleChangeUpload}
                            >
                                <button className='btn-upload'>
                                    <FaPaperclip className='icon' />
                                    <span className='title'>Tải lên tệp đính kèm</span>
                                </button>
                            </Upload>
                            {!isEmpty(listFile) && (<div className='title-upload'>Tệp đính kèm ({listFile.length})
                                <FaCaretDown className='icon' onClick={handleHiddenListFile}/>
                            </div>)}
                        </div>
                    </div>
                    <div className='footer'>
                        <button type="button" className={'btn-save'}
                                onClick={handleSubmit}
                        >
                            Đăng
                        </button>
                    </div>
                </div>
            </Modal>

        </div>
    );
}

export default AddPost;