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
import {getListCommentsPost, likePost} from "~/api/Client/Post/postAPI";
import {useSelector} from "react-redux";
import {getUserSelector} from "~/redux/selectors/auth/authSelector";
PostItem.propTypes = {

};
const cx=classNames.bind(styles);
function PostItem({post,onUpdate,onDelete}) {
    const [showComment,setShowComment]=useState(false)

    const [liked,setLiked]=useState(false)
    const date=dayjs(post.updated_at,'YYYY-MM-DDTHH:mm:ss.SSSSZ').locale('vi').format('HH:mm, DD [tháng] M, YYYY');
    const listActions=[
        {label: 'Cập nhật bài viết',key:'edit',icon:<FaPenAlt/>},
        {label: 'Xóa bài viết',key:'delete',icon:<FaTrashAlt/>}
    ]
    const userLogin=useSelector(getUserSelector)
    const arrayImages=post.posts_images.map((item)=>({src:item.image_url, width: 3, height: 2}))
    const handleOnClickAction=(value)=>{
            if(value.key==='edit'){
                onUpdate(post)
            }
            else {
                onDelete(post.id)
            }
    }
    const handleLiked=async (id) => {
        const result = await likePost(id, userLogin.id)
        if(result.status===1){
        setLiked(true)
        }else {
            setLiked(false)
        }
    }
    const handleGetListComments=async () => {
        setShowComment(!showComment)
        // if(showComment){
        //     setShowComment(false)
        // }
        // else {
        //     const result = await getListCommentsPost(post.id)
        //     if(result.status===1){
        //         setListComments(result.data)
        //         setShowComment(true)
        //     }
        //     else {
        //
        //     }
        // }
    }
    return (
        <div className={cx('post-item')}>
            <div className={cx('post-head')}>
                <div className={cx('post-user')}>
                    <AvatarCustom lastName={post.created_by.last_name} avatar={post.created_by.avatar_url} className={cx('post-avatar')} />
                    <div className={cx('post-author')}>
                        <span className={cx('post-name-author')}>
                            {`${post.created_by.first_name} ${post.created_by.last_name}`}
                        </span>
                        <span className={cx('post-date')}>
                            {date}
                        </span>
                    </div>
                </div>
                {
                    post.created_by.id === userLogin.id &&(
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
                    )
                }

            </div>
            <div className={cx('post-content')}>
                <div className={cx('description')} dangerouslySetInnerHTML={{ __html: post.content }}></div>
                {
                    <Gallery photos={arrayImages} limitNodeSearch={4} />
                }
            </div>
            <div className={cx('post-stats')}>
                <div className={cx('cmt')}>{post.hasOwnProperty('comments')?post.comments.length:0} bình luận</div>
                <div className={cx('like')}>{post.hasOwnProperty('total_likes')?post.total_likes:0} thích</div>
            </div>
            <div className={cx('post-actions')}>

                <div className={cx('action-item',`${liked?'active-like':'like-btn'}`)} onClick={()=>handleLiked(post.id)}>
                    <FaRegThumbsUp className={cx('icon')} />
                    <span className={cx('title')}>Thích</span>
                </div>
                <div className={cx('action-item')} onClick={handleGetListComments}>
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
                            <Comment user={userLogin} postId={post.id}  />
                        </div>
                    )
                }
            </div>
        </div>

    );
}

export default PostItem;