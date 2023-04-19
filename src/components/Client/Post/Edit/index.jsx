import React, {useState} from 'react';
import PropTypes from 'prop-types';
import './style.scss'
import AvatarCustom from "~/components/commoms/AvatarCustom";
import { Modal, Upload} from "antd";
import {FaCaretDown, FaPaperclip} from "react-icons/fa";
import CustomEditor from "~/components/commoms/Edittor";
import {isEmpty} from "lodash";
import {useSelector} from "react-redux";
import {postSelector} from "~/redux/selectors/post/postSelector";
EditPost.propTypes = {

};

function EditPost({author,onSave}) {
    const post=useSelector(postSelector)
    const [showEdit,setShowEdit]=useState(false)
    const [errorDescription, setErrorDescription] = useState('');
    const [description,setDescription] = useState('')
    const [listFile, setListFile] = useState(post.listFile)
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
        setShowEdit(false)

    }
    return (
        <div className='update-post-container'>
                <div className={'form-update-post'}>
                    <div className='post-head'>
                        <div className='post-user'>
                            <AvatarCustom lastName={post.author.last_name} avatar={author.avatar} className={'post-avatar'} />
                        </div>
                        <span className={'post-name-author'}>
                            {`${post.author.first_name} ${post.author.last_name}`}
                        </span>

                    </div>
                    <div className='post-content'>
                        <CustomEditor id="description" editorDescription={editorDescription} defaultValues={post.description}/>
                        <div className='attach-file'>
                            <Upload
                                action="http://localhost:3000/"
                                listType="picture"
                                fileList={listFile}
                                defaultFileList={listFile}
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
        </div>
    );
}

export default EditPost;