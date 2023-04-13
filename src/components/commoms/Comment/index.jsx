import React, {useState} from 'react';
import PropTypes from 'prop-types';
import AvatarCustom from "~/components/commoms/AvatarCustom";
import styles from './Comment.module.scss'
import classNames from "classnames/bind";
import CommentItem from "~/components/commoms/Comment/CommentItem";
import {isEmpty} from "lodash";
import CommentForm from "~/components/commoms/Comment/CommentForm";
Comment.propTypes = {

};
const cx=classNames.bind(styles)
const listCmT= [
    {
        id: "1",
        body: "Tin này chuẩn không. Diễn ra khi nao ?. Có yêu cầu gì không ạ",
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
        userId: "1",
        parentId: null,
        createdAt: "2021-08-16T23:00:33.010+02:00",
    },
    {
        id: "2",
        body: "Second comment",
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
    },
    {
        id: "3",
        body: "First comment first child",
        user:  {
            id: 4,
            first_name: 'Lê Phạm',
            last_name: 'Ngân',
            phone_number: '08844148784',
            gender: 'nữ',
            birth_date: '01-10-2008',
            mail: 'nganxulaku@gmail.com',
            role: 'Thư Ký',
            avatar: 'https://th.bing.com/th/id/OIP.JZb8Bkv2vXm6G4W6KZy-rAHaHV?pid=ImgDet&rs=1',
            address: 'HCM',
            status: 1,
        },
        userId: "2",
        parentId: "1",
        createdAt: "2021-08-16T23:00:33.010+02:00",
    },
    {
        id: "4",
        body: "Second comment second child",
        user:  {
            id: 3,
            first_name: 'Đặng Mỹ',
            last_name: 'Duyên',
            username:'DuyenHeo',
            phone_number: '08844148784',
            gender: 'nữ',
            birth_date: '13-03-2001',
            mail: 'myduyendang@gmail.com',
            role: 'marketing',
            avatar: 'https://i.ibb.co/b1NMyzK/245804844-404366584523944-4549889997937277396-n.jpg?fbclid=IwAR3ohY6mG5WqQ36DPg85eUhRqvEhPzC6s9uc9i06tceKdvE1XHYVoDsRCvU',
            address: 'HCM',
        },
        userId: "2",
        parentId: "2",
        createdAt: "2021-08-16T23:00:33.010+02:00",
    },
];

function Comment({user,listComment=listCmT}) {
    const [activeComment, setActiveComment] = useState(null);
    const handleSubmitComment=(data) => {
        console.log('Comment: ', data)
    }
    return (
        <div className={cx('container-comment')}>
            <CommentForm  user={user} onSubmit={handleSubmitComment}/>
            <div className={cx('list-comments')}>
                {!isEmpty(listComment) && listComment.map(item =>(
                    <CommentItem comment={item} key={item.id}
                                 replies={[]}
                                 activeComment={activeComment}
                                 setActiveComment={setActiveComment}
                    currentUserId={1}
                    />
                ))}
            </div>
        </div>
    );
}

export default Comment;