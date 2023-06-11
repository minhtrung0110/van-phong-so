import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import './style.scss'
import {
    menu_config_home_client_items,
    menu_function_client_items,
    menu_home_client_items
} from "~/asset/data/menu-client-item";
import {NavLink, useNavigate} from "react-router-dom";
import {listDepartments, listPosts, userLogin} from "~/asset/data/initDataGlobal";
import PostItem from "~/components/commoms/PostItem";
import SearchHidenButton from "~/components/commoms/SearchHideButton";
import {FaChalkboard, FaList} from "react-icons/fa";
import {config} from "~/config";
import ConfirmModal from "~/components/commoms/ConfirmModal";
import AddPost from "~/components/Client/Post/Add";
import {message, Modal} from "antd";
import {isEmpty} from "lodash";
import EditPost from "~/components/Client/Post/Edit";
import {useDispatch, useSelector} from "react-redux";
import {setPost} from "~/redux/reducer/post/postReducer";
import {createPost, getListPosts, likePost} from "~/api/Client/Post/postAPI";
import {setExpiredToken} from "~/redux/reducer/auth/authReducer";
import {deleteCookie, getCookies} from "~/api/Client/Auth";
import {getListStaffs} from "~/api/Client/Staff/staffAPI";
import {getUserSelector} from "~/redux/selectors/auth/authSelector";
HomePage.propTypes = {

};

function HomePage({slot}) {
    const [data,setData] =useState([])
    const [loading, setLoading] = React.useState(true);
    const [showConfirm,setShowConfirm]=useState({id:null,show:false})
    const [postEdit,setPostEdit]=useState(false)
    const [messageApi, contextHolder] = message.useMessage();
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const userLogin=useSelector(getUserSelector)
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
    const handleSetUnthorization = () => {
        dispatch(setExpiredToken(true));
        const token = getCookies('vps_token');
        if (token) {
            deleteCookie('vps_token');
        }
        navigate(config.routes.login)
    };
    const handleCreatePost=async (post) => {
        console.log('Create post ', post)
        const result = await createPost(post)
        if(result.status===1){
            messageApi.open({
                type: 'success',
                content: result.message,
                duration: 1.3,
            });
        }else if(result===401){
            handleSetUnthorization()
        }else {
            messageApi.open({
                type: 'error',
                content: result.message,
                duration: 1.3,
            });
        }
    }

    const handleUpdatePost=(post)=>{
        console.log('Update post ',post)
    }
    useEffect(() => {
        async function fetchData() {
            //  setLoading(true)
            let params = {};
            //console.log('Params:', params)
            const respond = await getListPosts();
            console.log('Data respond:', respond)
            if (respond === 401) {
                handleSetUnthorization();
                return false;
            } else if (respond === 500) {
                setData([])
                return false;
            } else {
                setPosts(respond, 'reset-page');
            }
            setLoading(false);
        }

        fetchData();
    },[])
    const setPosts = (respond, value) => {
        setData(respond.results);
        // if (value !== 'page') {
        //     setPage(1);
        // }
        // setTotalRecord(respond.pagination.totalRecords);
        // setTotalPage(result.meta.);
    };
    return (
        <div className='container-newsfeed'>
            {
                contextHolder
            }
            <div className='gr-left'>

                <div className='list-posts'>
                    <div className='create-post'>
                        <AddPost  author={userLogin} onSave={handleCreatePost} />
                    </div>
                    {!!data && data.map(item => (
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