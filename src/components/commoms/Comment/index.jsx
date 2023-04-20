import React, {useState} from 'react';
import PropTypes from 'prop-types';
import AvatarCustom from "~/components/commoms/AvatarCustom";
import styles from './Comment.module.scss'
import classNames from "classnames/bind";
import CommentItem from "~/components/commoms/Comment/CommentItem";
import {isEmpty} from "lodash";
import CommentForm from "~/components/commoms/Comment/CommentForm";
import ConfirmModal from "~/components/commoms/ConfirmModal";
Comment.propTypes = {

};
const cx=classNames.bind(styles)


function Comment({user,listComment}) {
    const [activeComment, setActiveComment] = useState({});
    const [showConfirm,setShowConfirm] =useState({id:null,show:false})
    const handleSubmitComment=(data) => {
        console.log('Comment: ', data)
    }
    const handAddComment = (data,replyID) =>{
        console.log('Comment Add: ', data,replyID)
    }
    const handleUpdateComment = (comment)=>{
        setActiveComment(comment)

    }
    const handleDeleteComment = (comment)=>{
        console.log('Comment Delete: ', comment)
    }
    const handleConfirmDeleteComment = (id)=>{
        setShowConfirm({id,show:true})
    }
    console.log('Comment Update: ', activeComment)
    return (
        <div className={cx('container-comment')}>
            {
                !!activeComment ?(
                    <CommentForm  user={activeComment.user} onSubmit={handleSubmitComment} initialText={activeComment.description} fileAttached={activeComment.file}/>
                ):(
                    <CommentForm  user={user} onSubmit={handleSubmitComment} />
                )
            }

            <div className={cx('list-comments')}>
                {!isEmpty(listComment) && listComment.map(item =>(
                    <CommentItem comment={item} key={item.id}
                                 replies={[
                                     {
                                         id: "2",
                                         description: "Tôi đồng ý vói bạn",
                                         file:null,
                                         user:  {
                                             id: 1,
                                             first_name: 'Phạm Minh',
                                             last_name: 'Trang',
                                             username:'NPhamTrang',
                                             phone_number: '09744148784',
                                             gender: 'nam',
                                             birth_date: '01-10-2001',
                                             mail: 'minhtrung@gmail.com',
                                             role: 'CEO',
                                             avatar: 'https://i.ibb.co/mvybfht/C-i-n-3-1.jpg',
                                             address: 'Tan Quy Tây, Bình Chanh,HCM',
                                             status: 1,
                                         },
                                         userId: "2",
                                         parentId: null,
                                         createdAt: "2021-08-16T23:00:33.010+02:00",
                                     },  {
                                         id: "2",
                                         description: "Second comment",
                                         file:null,
                                         user:  {
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
                                         },
                                         userId: "2",
                                         parentId: null,
                                         createdAt: "2021-08-16T23:00:33.010+02:00",
                                     },]}
                                 activeComment={activeComment}
                                 setActiveComment={setActiveComment}
                                 addComment={handAddComment}
                                 deleteComment={handleConfirmDeleteComment}

                    currentUserId={1}
                    />
                ))}
            </div>
            <ConfirmModal title="Xác Nhận Xóa Bình Luận"
                          open={showConfirm.show}
                          content={`Bạn Có Thực Sự Muốn Xóa Bình Luận Này Không ? `}
                          textOK="Xóa"
                          textCancel="Hủy"
                          onOK={() => handleDeleteComment(showConfirm.id)}
                          onCancel={(e) => setShowConfirm({...showConfirm, show: false})}/>
        </div>
    );
}

export default Comment;