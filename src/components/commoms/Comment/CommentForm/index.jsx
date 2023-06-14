import React, {useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import AvatarCustom from "~/components/commoms/AvatarCustom";
import styles from './CommentForm.module.scss'
import {useForm} from 'react-hook-form'
import classNames from "classnames/bind";
import {Input, Modal, Upload} from "antd";
import {FaCaretDown, FaEye, FaPaperclip, FaPaperPlane, FaRegSmile, FaTrash} from "react-icons/fa";
import {isEmpty} from "lodash";
import comment from "~/components/commoms/Comment";

CommentForm.propTypes = {};
const cx = classNames.bind(styles)
function CommentForm({user, onSubmit, initialText = "",id,onUpdate, className}) {
    const [value, setValue] = useState()
    const {
        control, handleSubmit, formState: {errors, isDirty, dirtyFields},
    } = useForm({});
    useEffect(() => {
        setValue(initialText);
    }, [initialText]);
    const onSave = () => {
        // validate Value
        if(onUpdate)
            onSubmit({id:id,comment: value})
        else
        onSubmit({comment: value})
        setValue('')
    }



    return (
        <form className={cx(`component-editor`, className)} onSubmit={handleSubmit(onSave)}>
            <div className={cx('comment-input')}>
                {!!user && <AvatarCustom lastName={user.last_name} avatar={user.avatar_url} className={cx('post-avatar')}
                                         size={'small'}/>}
                <div className={cx('editor')}>
                    <input className={cx('input-comment')}
                           value={value}
                           placeholder={'Nhập bình luận'}
                           onChange={e => setValue(e.target.value)}
                           onKeyDown={event => (event.key === 'Enter') && handleSubmit(onSave)}
                    />
                </div>
            </div>

            <button type={'submit'} className={cx('files')}>
                <FaPaperPlane className={cx('icon')}/>
            </button>

        </form>

    );
}

export default CommentForm;