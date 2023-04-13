import React from 'react';
import PropTypes from 'prop-types';
import {FaEllipsisH, FaRegCommentAlt, FaRegThumbsUp} from "react-icons/fa";
import styles from './PostItem.module.scss'
import classNames from "classnames/bind";
import AvatarCustom from "~/components/commoms/AvatarCustom";
import dayjs from "dayjs";
import 'dayjs/locale/vi';
import {isEmpty} from "lodash";
import CommentItem from "~/components/commoms/Comment/CommentItem";
import Comment from "~/components/commoms/Comment";
PostItem.propTypes = {

};
const cx=classNames.bind(styles);
function PostItem({post}) {
    const date=dayjs(post.date,'YYYY-MM-DD').locale('vi').format('HH:mm, DD [tháng] M, YYYY');
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
                <div className={cx('post-more')}>
                    <FaEllipsisH className={cx('icon')} />
                </div>
            </div>
            <div className={cx('post-content')}>
                <div className={cx('description')}>{post.content.description}</div>
                {
                    !isEmpty(post.content.images) &&(
                        <div className={cx('list-image')}>
                        </div>
                    )
                }
            </div>
            <div className={cx('post-stats')}>
                <div className={cx('view')}>{10} lượt xem</div>
                <div className={cx('cmt')}>{post.comments.length} bình luận</div>
            </div>
            <div className={cx('post-actions')}>

                <div className={cx('action-item')}>
                    <FaRegThumbsUp className={cx('icon')} />
                    <span className={cx('title')}>Thích</span>
                </div>
                <div className={cx('action-item')}>
                    <FaRegCommentAlt className={cx('icon')} />
                    <span className={cx('title')}>Bình luận</span>
                </div>

            </div>
            <div className={cx('post-comments')}>

            </div>
            <div className={cx('post-comment-wrappers')}>
                    <div className={cx('media')}>
                        <Comment user={post.author} listComment={post.listComment} />
                    </div>
            </div>
        </div>

    );
}

export default PostItem;