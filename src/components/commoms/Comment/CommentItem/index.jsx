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
                         addComment, parentId = null, currentUser}) {
    const [isReplying,setIsReplying] =useState( false)
    const [visibleComments, setVisibleComments] = useState(0);
    const handleShowMoreComments = () => {
        setVisibleComments(visibleComments + 5);
    };
    const displayedComments = replies.slice(0, visibleComments);
    const fiveMinutes = 300000;
    const timePassed = new Date() - new Date(comment.createdAt) > fiveMinutes;
    const canDelete =currentUser.id === comment.employee.id && replies.length === 0; //&& !timePassed;
    const canReply =Boolean(currentUser.id)
    const canEdit = currentUser.id === comment.employee.id; //&& !timePassed;
    const replyId = parentId ? parentId : comment.id;
    const createdAt = new Date(comment.created_at).toLocaleDateString();

    const handleReply=(text)=>{

        addComment(text, replyId)
        setIsReplying(false)
    }
    return (
        <div className={cx('comment')}>
            <div key={comment.id} className={cx("comment-item")}>
                <div className={cx("comment-avatar")}>
                    <AvatarCustom lastName={comment.employee.last_name} avatar={comment.employee.avatar_url} className={cx('post-avatar')} size={'small'} />
                </div>
                <div className={cx("comment-right-part")}>
                    <div className={cx("comment-content")}>
                        <div className={cx("comment-author")}>{`${comment.employee.first_name} ${comment.employee.last_name}`}</div>
                       <div className={cx("comment-text")}>{comment.content}</div>

                    </div>
                    <div className={cx("comment-actions")}>
                        {canReply && (
                            <div
                                className={cx("comment-action")}
                                onClick={() =>                                    setIsReplying(!isReplying)
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
                    user={currentUser}
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
                            currentUser={currentUser}
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