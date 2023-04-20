import React, {useState} from 'react';
import PropTypes from 'prop-types';
import styles from './CommentItem.module.scss'
import classNames from "classnames/bind";
import CommentForm from "~/components/commoms/Comment/CommentForm";
import AvatarCustom from "~/components/commoms/AvatarCustom";
import {FaReply} from "react-icons/fa";
import ConfirmModal from "~/components/commoms/ConfirmModal";
import {Button} from "antd";
CommentItem.propTypes = {

};
const cx=classNames.bind(styles)
function CommentItem({comment, replies, setActiveComment, activeComment, updateComment, deleteComment,
                         addComment, parentId = null, currentUserId}) {
    const [isReplying,setIsReplying] =useState( false)
    const [visibleComments, setVisibleComments] = useState(0);
    const handleShowMoreComments = () => {
        setVisibleComments(visibleComments + 5);
    };
    const displayedComments = replies.slice(0, visibleComments);
    const fiveMinutes = 300000;
    const timePassed = new Date() - new Date(comment.createdAt) > fiveMinutes;
    const canDelete =currentUserId === comment.user.id && replies.length === 0; //&& !timePassed;
    const canReply =Boolean(currentUserId)
    const canEdit = currentUserId === comment.user.id; //&& !timePassed;
    const replyId = parentId ? parentId : comment.id;
    const createdAt = new Date(comment.createdAt).toLocaleDateString();

    const handleReply=(text)=>{

        addComment(text, replyId)
        setIsReplying(false)
    }
    return (
        <div className={cx('comment')}>
            <div key={comment.id} className={cx("comment-item")}>
                <div className={cx("comment-avatar")}>
                    <AvatarCustom lastName={comment.user.last_name} avatar={comment.user.avatar} className={cx('post-avatar')} size={'small'} />
                </div>
                <div className={cx("comment-right-part")}>
                    <div className={cx("comment-content")}>
                        <div className={cx("comment-author")}>{`${comment.user.first_name} ${comment.user.last_name}`}</div>
                       <div className={cx("comment-text")}>{comment.description}</div>

                    </div>
                    <div className={cx("comment-actions")}>
                        {canReply && (
                            <div
                                className={cx("comment-action")}
                                onClick={() =>                                    setIsReplying(true)
                                }
                            >
                                <FaReply />
                            </div>
                        )}
                        {canEdit && (
                            <div
                                className={cx("comment-action")}
                                onClick={() => setActiveComment(comment)
                                }
                            >
                                Chỉnh sửa
                            </div>
                        )}
                        {canDelete && (
                            <div
                                className={cx("comment-action")}
                                onClick={() => deleteComment(comment.id)}
                            >
                                Xóa
                            </div>
                        )}
                        <div className={cx("comment-action")}>
                            {createdAt}
                        </div>
                    </div>
                </div>
            </div>
            {isReplying && (
                <CommentForm
                    className={cx('form')}
                    user={{
                    id: 1,
                    first_name: 'Nguyễn Đức Minh',
                    last_name: 'Trung',
                    username:'NguyenTrung',
                    phone_number: '09744148784',
                    gender: 'nam',
                    birth_date: '01-10-2001',
                    mail: 'minhtrung@gmail.com',
                    role: 'CEO',
                    avatar: 'https://i.ibb.co/mvybfht/C-i-n-3-1.jpg',
                    address: 'Tan Quy Tây, Bình Chanh,HCM',
                    status: 1,
                }}
                onSubmit={handleReply}
                />
            )}
            {replies.length > 0 && (
                <div className={cx("replies")}>
                    {displayedComments.map((reply) => (
                        <CommentItem
                            comment={reply}
                            key={reply.id}
                            setActiveComment={setActiveComment}
                            updateComment={updateComment}
                            deleteComment={deleteComment}
                            addComment={addComment}
                            parentId={comment.id}
                            replies={[]}
                            currentUserId={currentUserId}
                        />
                    ))}
                    {visibleComments < replies.length && (
                      <div className={cx("replies-more")}>
                          <Button className={cx('view-more')} onClick={handleShowMoreComments}>Xem thêm</Button>
                      </div>
                    )}
                </div>
            )}

        </div>

    );
}

export default CommentItem;