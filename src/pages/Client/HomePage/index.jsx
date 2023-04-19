import React, {useState} from 'react';
import PropTypes from 'prop-types';
import './style.scss'
import {
    menu_config_home_client_items,
    menu_function_client_items,
    menu_home_client_items
} from "~/asset/data/menu-client-item";
import {NavLink} from "react-router-dom";
import {listDepartments, listPosts, userLogin} from "~/asset/data/initDataGlobal";
import PostItem from "~/components/commoms/PostItem";
import SearchHidenButton from "~/components/commoms/SearchHideButton";
import {FaChalkboard, FaList} from "react-icons/fa";
import {config} from "~/config";
import ConfirmModal from "~/components/commoms/ConfirmModal";
import AddPost from "~/components/Client/Post/Add";
import {Modal} from "antd";
import {isEmpty} from "lodash";
import EditPost from "~/components/Client/Post/Edit";
import {useDispatch} from "react-redux";
import {setPost} from "~/redux/reducer/post/postReducer";
HomePage.propTypes = {

};

function HomePage({slot}) {
    const [showConfirm,setShowConfirm]=useState({id:null,show:false})
    const [postEdit,setPostEdit]=useState(false)
    const dispatch=useDispatch()
    const handleDeletePost=(id)=>{
        console.log('Delete post ',showConfirm.id)
    }
    const handleOpenConfirm=(id)=>{
        setShowConfirm({id:id,show:true})
    }
    const handleOpenUpdatePost=(post)=>{
        setPostEdit(true)
        dispatch(setPost(post))
       // console.log('Update post ',post)
    }
    const handleCreatePost=(post)=>{
        console.log('Create post ',post)
    }
    const handleUpdatePost=(post)=>{
        console.log('Update post ',post)
    }
    return (
        <div className='container-newsfeed'>
            <div className='gr-left'>

                <div className='list-posts'>
                    <div className='create-post'>
                        <AddPost  author={userLogin} onSave={handleCreatePost} />
                    </div>
                    {!!listPosts && listPosts.map(item => (
                        <PostItem post={item}
                                  onUpdate={handleOpenUpdatePost}
                                  onDelete={handleOpenConfirm}
                        />
                    ))}

                </div>
            </div>
            <div className='gr-right'>
                <div className='filter-posts'>
                    <SearchHidenButton width={'15rem'}/>
                    <span className='title'>
                        <FaList className={'icon'} />
                        Danh sách nhóm</span>
                    <div className='list-groups'>

                        {
                            listDepartments.map(department =>(
                                <NavLink className='department-item'
                                         to={`${config.routes.post}/${department.id}`}
                                >
                                    <FaChalkboard className='icon'></FaChalkboard>
                                    {department.name}
                                </NavLink>
                            ))
                        }
                    </div>
                </div>

            </div>
            <Modal title="" open={postEdit}
                   maskClosable={true}
                   destroyOnClose={true}
                   onCancel={()=>setPostEdit(null)}
                   footer={null}
                   width={700}
                   style={{top: 50}}
            >
                <EditPost  author={userLogin} onSave={handleUpdatePost} />
            </Modal>
            <ConfirmModal title="Xác Nhận Xóa"
                          open={showConfirm.show}
                          content={`Bạn Có Thực Sự Muốn Xóa Bài Viết Này Không ? `}
                          textOK="Xóa"
                          textCancel="Hủy"
                          onOK={handleDeletePost}
                          onCancel={(e) => setShowConfirm({...showConfirm, show: false})}/>
        </div>)
}

export default HomePage;