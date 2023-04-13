import React, {useRef, useState} from 'react';
import PropTypes from 'prop-types';
import AvatarCustom from "~/components/commoms/AvatarCustom";
import styles from './CommentForm.module.scss'
import {useForm} from 'react-hook-form'
import classNames from "classnames/bind";
import {Input, Modal, Upload} from "antd";
import {FaCaretDown, FaEye, FaPaperclip, FaRegSmile, FaTrash} from "react-icons/fa";
import {isEmpty} from "lodash";
import comment from "~/components/commoms/Comment";

CommentForm.propTypes = {};
const cx = classNames.bind(styles)
const getBase64 = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
});

function CommentForm({
                         user, onSubmit, submitLabel,
                         hasCancelButton = false,
                         handleCancel,
                         initialText = "",className
                     }) {
    const [value, setValue] = useState()
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const {
        control, handleSubmit, formState: {errors, isDirty, dirtyFields},
    } = useForm({});
    const onSave = () => {
        onSubmit({comment: value, file: listFile})
        setValue('')
        setListFile([])
    }

    const [listFile, setListFile] = useState([])
    const handleChangeUpload = (info) => {
        setListFile(info.fileList)
    }
    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
        setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
    };

    return (
        <form className={cx(`component-editor`,className)} onSubmit={handleSubmit(onSave)} >
            <div className={cx('comment-input')}>
                <AvatarCustom lastName={user.last_name} avatar={user.avatar} className={cx('post-avatar')}
                              size={'small'}/>
                <div className={cx('editor')}>
                    <input className={cx('input-comment')}
                           value={value}
                           placeholder={'Nhập bình luận'}
                           onChange={e => setValue(e.target.value)}
                           onKeyDown={event => (event.key === 'Enter') && handleSubmit(onSave)}
                    />
                </div>
            </div>
            <Upload
                action="http://localhost:3000/"
                listType="picture"
                onPreview={handlePreview}
                maxCount={1}
                fileList={listFile}
                onChange={handleChangeUpload}
            >
                 <span className={cx('files')}>
                <FaPaperclip className={cx('icon')}/>
                 </span>

            </Upload>
            <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={() => setPreviewOpen(false)}>
                <img
                    alt="example"
                    style={{
                        width: '100%',
                    }}
                    src={previewImage}
                />
            </Modal>
        </form>

    );
}

export default CommentForm;