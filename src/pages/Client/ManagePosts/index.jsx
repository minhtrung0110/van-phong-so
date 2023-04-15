import React, {useState} from 'react';
import PropTypes from 'prop-types';
import './style.scss'
import PostItem from "~/components/commoms/PostItem";
import ConfirmModal from "~/components/commoms/ConfirmModal";
import {listDepartments, listPosts} from "~/asset/data/initDataGlobal";
import SearchHidenButton from "~/components/commoms/SearchHideButton";
import {NavLink} from "react-router-dom";
import {config} from "~/config";
import {FaChalkboard, FaList} from "react-icons/fa";

PostManagement.propTypes = {};


function PostManagement(props) {
    const [showConfirm,setShowConfirm]=useState({id:null,show:false})
    const handleDeletePost=(id)=>{
              console.log('Delete post ',showConfirm.id)
    }
    const handleOpenConfirm=(id)=>{
        setShowConfirm({id:id,show:true})
    }
    const handleUpdatePost=(post)=>{
        console.log('Update post ',post)
    }
    return (
        <div className='container-post'>
            <div className='gr-left'>
                <div className='list-posts'>
                    {!!listPosts && listPosts.map(item => (
                        <PostItem post={item}
                        onUpdate={handleUpdatePost}
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
            <ConfirmModal title="Xác Nhận Xóa"
                          open={showConfirm.show}
                          content={`Bạn Có Thực Sự Muốn Xóa Bài Viết Này Không ? `}
                          textOK="Xóa"
                          textCancel="Hủy"
                          onOK={handleDeletePost}
                          onCancel={(e) => setShowConfirm({...showConfirm, show: false})}/>
        </div>
    );
}

export default PostManagement;