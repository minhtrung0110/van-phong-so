import React from 'react';
import PropTypes from 'prop-types';
import styles from './CommentItem.module.scss'
import classNames from "classnames/bind";
import CommentForm from "~/components/commoms/Comment/CommentForm";
import AvatarCustom from "~/components/commoms/AvatarCustom";
import {FaReply} from "react-icons/fa";
CommentItem.propTypes = {

};
const cx=classNames.bind(styles)
function CommentItem({comment, replies, setActiveComment, activeComment, updateComment, deleteComment,
                         addComment, parentId = null, currentUserId}) {
    const isEditing =
        activeComment &&
        activeComment.id === comment.id &&
        activeComment.type === "editing";
    const isReplying =
        activeComment &&
        activeComment.id === comment.id &&
        activeComment.type === "replying";
    const fiveMinutes = 300000;
    const timePassed = new Date() - new Date(comment.createdAt) > fiveMinutes;
    console.log(isEditing)
    const canDelete =currentUserId === comment.user.id && replies.length === 0; //&& !timePassed;
    const canReply =Boolean(currentUserId)
    const canEdit = currentUserId === comment.user.id; //&& !timePassed;
    const replyId = parentId ? parentId : comment.id;
    const createdAt = new Date(comment.createdAt).toLocaleDateString();
    return (
        <div className={cx('comment')}>
            <div key={comment.id} className={cx("comment-item")}>
                <div className={cx("comment-avatar")}>
                    <AvatarCustom lastName={comment.user.last_name} avatar={comment.user.avatar} className={cx('post-avatar')} size={'small'} />
                </div>
                <div className={cx("comment-right-part")}>
                    <div className={cx("comment-content")}>
                        <div className={cx("comment-author")}>{`${comment.user.first_name} ${comment.user.last_name}`}</div>
                        {!isEditing && <div className={cx("comment-text")}>{comment.body}</div>}
                    </div>
                    <div className={cx("comment-actions")}>
                        {canReply && (
                            <div
                                className={cx("comment-action")}
                                onClick={() =>
                                    setActiveComment({ id: comment.id, type: "replying" })
                                }
                            >
                                <FaReply />
                            </div>
                        )}
                        {canEdit && (
                            <div
                                className={cx("comment-action")}
                                onClick={() =>
                                    setActiveComment({ id: comment.id, type: "editing" })
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

                    {/*{isReplying && (*/}
                    {/*    <CommentForm*/}
                    {/*        submitLabel="Reply"*/}
                    {/*        handleSubmit={(text) => addComment(text, replyId)}*/}
                    {/*    />*/}
                    {/*)}*/}
                    {/*{replies.length > 0 && (*/}
                    {/*    <div className="replies">*/}
                    {/*        {replies.map((reply) => (*/}
                    {/*            <CommentItem*/}
                    {/*                comment={reply}*/}
                    {/*                key={reply.id}*/}
                    {/*                setActiveComment={setActiveComment}*/}
                    {/*                activeComment={activeComment}*/}
                    {/*                updateComment={updateComment}*/}
                    {/*                deleteComment={deleteComment}*/}
                    {/*                addComment={addComment}*/}
                    {/*                parentId={comment.id}*/}
                    {/*                replies={[]}*/}
                    {/*                currentUserId={currentUserId}*/}
                    {/*            />*/}
                    {/*        ))}*/}
                    {/*    </div>*/}
                    {/*)}*/}
                </div>


            </div>
            {isEditing && (
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
                }}              />
            )}
        </div>

    );
}

export default CommentItem;