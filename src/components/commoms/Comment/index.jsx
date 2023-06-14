import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import AvatarCustom from "~/components/commoms/AvatarCustom";
import styles from './Comment.module.scss'
import classNames from "classnames/bind";
import CommentItem from "~/components/commoms/Comment/CommentItem";
import {isEmpty} from "lodash";
import CommentForm from "~/components/commoms/Comment/CommentForm";
import ConfirmModal from "~/components/commoms/ConfirmModal";
import {createComment, deleteComment, editComment, getListCommentsPost} from "~/api/Client/Post/postAPI";
import {setExpiredToken} from "~/redux/reducer/auth/authReducer";
import {deleteCookie, getCookies} from "~/api/Client/Auth";
import {config} from "~/config";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
Comment.propTypes = {

};
const cx=classNames.bind(styles)


function Comment({user,postId}) {
    const [loading,setLoading]=useState(false)
    const [listComments,setListComments]=useState([])
    const [activeComment, setActiveComment] = useState({});
    const [reset,setReset] = useState(false)
    const [showConfirm,setShowConfirm] =useState({id:null,show:false})
    const handleSubmitComment=async (data) => {

        //edit
        if(data.hasOwnProperty('id')){
            console.log('Update Comment: ', {
                id:data.id,
                content: data.comment,
                employee_id: user.id,
                post_id:postId,
            })
            const response = await editComment(postId,{
                id:data.id,
                content: data.comment,
                employee_id: user.id,
            })
            if (response.status === 1) {
                    setReset(!reset)
            } else if (response === 401) {

            } else {

            }
        }// create
        else {
            console.log('Create Comment: ', {
                content: data.comment,
                employee_id: user.id,
            })
            const response = await createComment(postId,{
                content: data.comment,
                employee_id: user.id,
                post_id:postId,
            })
            if (response.status === 1) {
                setReset(!reset)
            } else if (response === 401) {

            } else {

            }
        }
    }
    const handAddReplyComment = async (data, replyID) => {
        console.log('Comment Add: ', data, replyID)
        // const response = await createComment({
        //     content: data,
        //     employee_id: user.id,
        // })
        // if (response.status === 1) {
        //
        // } else if (response === 401) {
        //
        // } else {
        //
        // }
    }
    const navigate=useNavigate()
    const dispatch = useDispatch()
    const handleUpdateComment = (comment)=>{
        setActiveComment(comment)

    }
    const handleDeleteComment = async (id) => {
        console.log('Comment Delete: ', id)
        const response = await deleteComment(id)
        if (response.status === 1) {
            setReset(!reset)
        } else if (response === 401) {

        } else {

        }
    }
    const handleConfirmDeleteComment = (id)=>{
        setShowConfirm({id,show:true})
    }
    const handleSetUnthorization = () => {
        dispatch(setExpiredToken(true));
        const token = getCookies('vps_token');
        if (token) {
            deleteCookie('vps_token');
        }
        navigate(config.routes.login)
    };
    useEffect(() => {
        async function fetchDataComments() {
            setLoading(true)
            let params = {};
            //console.log('Params:', params)
            const respond = await getListCommentsPost();
            console.log('Data respond:', respond)
            if (respond === 401) {
                handleSetUnthorization();
                return false;
            } else if (respond === 500) {
                setListComments([])
                return false;
            } else {
                setListComments(respond.data, 'reset-page');
            }
            setLoading(false);
        }

        fetchDataComments();
    },[reset])
    return (
        <div className={cx('container-comment')}>
            {
                !isEmpty(activeComment) ?(
                    <CommentForm  user={activeComment.employee}
                                  id={activeComment.id}
                                  onUpdate={true}
                                  onSubmit={handleSubmitComment} initialText={activeComment.content} />
                ):(
                    <CommentForm  user={user} onSubmit={handleSubmitComment} />
                )
            }

            <div className={cx('list-comments')}>
                {!isEmpty(listComments) && listComments.map(item =>(
                    <CommentItem comment={item} key={item.id}
                                 replies={[
                                   ]}
                                 activeComment={activeComment}
                                 setActiveComment={setActiveComment}
                                 addComment={handAddReplyComment}
                                 deleteComment={handleConfirmDeleteComment}

                    currentUser={user}
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