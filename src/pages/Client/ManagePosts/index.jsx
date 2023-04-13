import React from 'react';
import PropTypes from 'prop-types';
import './style.scss'
import PostItem from "~/components/commoms/PostItem";
PostManagement.propTypes = {
    
};
const listPosts=[
    {
        id:1,
        author: {
            id: 3,
            first_name: 'Hà',
            last_name: 'Nhi',
            phone_number: '08844148784',
            gender: 'nữ',
            birth_date: '08-02-1994',
            mail: 'nhixinhdep@gmail.com',
            role: '1',
            avatar: 'https://images2.thanhnien.vn/Uploaded/thynhm/2022_08_08/ha-nhi-7-8636.jpg',
            address: 'HCM',
            status: 1,
        },
        category:'',
        title:'Bảng tin sáng 08.04',
        content:{
            description:'Chào mọi người',
            background: '',
            images:[],
        },
        date:'2023-08-04',
        comments:[
            {id:1, title: 'Ah2 ha'}
        ],
        like:'',
        status:true

    },
    {
        id:2,
        author: {
            id: 3,
            first_name: 'Tần nguyễn hồ nam Hà',
            last_name: 'Nhi',
            phone_number: '08844148784',
            gender: 'nữ',
            birth_date: '08-02-1994',
            mail: 'nhixinhdep@gmail.com',
            role: 'nhan vien',
            avatar: 'https://images2.thanhnien.vn/Uploaded/thynhm/2022_08_08/ha-nhi-7-8636.jpg',
            address: 'HCM',
            status: 1,
        },
        category:'',
        title:'Bảng tin sáng 08.04',
        content:{
            description:'Chào mọi người',
            background: '',
            images:[],
        },
        date:'2023-04-01',
        comments:[
            {id:1, title: 'Ah2 ha'}
        ],
        like:'',
        status:true

    }
]
function PostManagement(props) {
    return (
        <div className='container-post'>
            <div className='list-posts'>
                {listPosts  && listPosts.map(item=> (
                    <PostItem post={item} />
                ))}

            </div>
            <div className='list-groups'>


            </div>

        </div>
    );
}

export default PostManagement;