import React, {useState} from 'react';
import PropTypes from 'prop-types';
import './style.scss'
import {
    menu_config_home_client_items,
    menu_function_client_items,
    menu_home_client_items
} from "~/asset/data/menu-client-item";
import {NavLink} from "react-router-dom";
import {listDepartments, listPosts} from "~/asset/data/initDataGlobal";
import PostItem from "~/components/commoms/PostItem";
import SearchHidenButton from "~/components/commoms/SearchHideButton";
import {FaChalkboard, FaList} from "react-icons/fa";
import {config} from "~/config";
import ConfirmModal from "~/components/commoms/ConfirmModal";
HomePage.propTypes = {

};

function HomePage({slot}) {
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
        </div>)
}

export default HomePage;