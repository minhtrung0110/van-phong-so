import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {FaEllipsisH, FaPenAlt, FaRegCommentAlt, FaRegThumbsUp, FaTrashAlt} from "react-icons/fa";
import styles from './PostItem.module.scss'
import classNames from "classnames/bind";
import AvatarCustom from "~/components/commoms/AvatarCustom";
import dayjs from "dayjs";
import 'dayjs/locale/vi';
import {isEmpty} from "lodash";
import CommentItem from "~/components/commoms/Comment/CommentItem";
import Comment from "~/components/commoms/Comment";
import Gallery from "react-photo-gallery";
import {Dropdown} from "antd";
import {value} from "lodash/seq";
PostItem.propTypes = {

};
const cx=classNames.bind(styles);
function PostItem({post,onUpdate,onDelete}) {
    const [showComment,setShowComment]=useState(false)
    const date=dayjs(post.date,'YYYY-MM-DD').locale('vi').format('HH:mm, DD [tháng] M, YYYY');
    const listActions=[
        {label: 'Cập nhật bài viết',key:'edit',icon:<FaPenAlt/>},
        {label: 'Xóa bài viết',key:'delete',icon:<FaTrashAlt/>}
    ]
    const handleOnClickAction=(value)=>{
            if(value.key==='edit'){
                onUpdate(post)
            }
            else {
                onDelete(post.id)
            }
    }
    return (
        <div className={cx('post-item')}>
            <div className={cx('post-head')}>
                <div className={cx('post-user')}>
                    <AvatarCustom lastName={post.author.last_name} avatar={post.author.avatar} className={cx('post-avatar')} />
                    <div className={cx('post-author')}>
                        <span className={cx('post-name-author')}>
                            {`${post.author.first_name} ${post.author.last_name}`}
                        </span>
                        <span className={cx('post-date')}>
                            {date}
                        </span>
                    </div>

                </div>
                <Dropdown
                    menu={{
                        items:listActions,
                        onClick: handleOnClickAction
                    }}
                    trigger={['click']}
                >
                    <div className={cx('post-more')}>
                        <FaEllipsisH className={cx('icon')} />
                    </div>
                </Dropdown>

            </div>
            <div className={cx('post-content')}>
                <div className={cx('description')}>{post.content.description}</div>
                {
                    <Gallery photos={post.files} limitNodeSearch={4} />
                }
            </div>
            <div className={cx('post-stats')}>
                <div className={cx('cmt')}>{post.comments.length} bình luận</div>
            </div>
            <div className={cx('post-actions')}>

                <div className={cx('action-item','like-btn')}>
                    <FaRegThumbsUp className={cx('icon')} />
                    <span className={cx('title')}>Thích</span>
                </div>
                <div className={cx('action-item')} onClick={()=>setShowComment(!showComment)}>
                    <FaRegCommentAlt className={cx('icon')} />
                    <span className={cx('title')}>Bình luận</span>
                </div>

            </div>
            <div className={cx('post-comments')}>

            </div>
            <div className={cx('post-comment-wrappers')}>

                {
                    !!showComment && (
                        <div className={cx('media')}>
                            <Comment user={post.author} listComment={post.comments} />
                        </div>
                    )
                }
            </div>
        </div>

    );
}

export default PostItem;