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
import {createPost, deletePost, editPost, getListPosts, likePost} from "~/api/Client/Post/postAPI";
import {setExpiredToken} from "~/redux/reducer/auth/authReducer";
import {deleteCookie, getCookies} from "~/api/Client/Auth";
import {getListStaffs} from "~/api/Client/Staff/staffAPI";
import {getUserSelector} from "~/redux/selectors/auth/authSelector";
import ListSprintSkeleton from "~/components/commoms/Skeleton/Project/Sprint";
HomePage.propTypes = {

};

function HomePage({slot}) {
    const [data,setData] =useState([])
    const [loading, setLoading] = React.useState(true);
    const [loadMore, setLoadMore] = useState(true);
    const [isReset,setIsReset] = useState(false);
    const [showConfirm,setShowConfirm]=useState({id:null,show:false})
    const [postEdit,setPostEdit]=useState(false)
    const [totalRecord, setTotalRecord] = React.useState(data.length);
    const [page, setPage] = React.useState(1);
    const [messageApi, contextHolder] = message.useMessage();
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const userLogin=useSelector(getUserSelector)
    const handleDeletePost=async (id) => {
        console.log('Delete post ', showConfirm.id)
        const response = await deletePost(showConfirm.id)
        if (response.status === 1) {
            messageApi.open({
                type:'success',
                message:response.message,
                duration:1.3
            })
        } else if (response === 401) {
            handleSetUnthorization()
        } else {
            messageApi.open({
                type:'error',
                message:response.message,
                duration:1.3
            })
        }
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

    const handleUpdatePost=async (post) => {
        console.log('Update post ', post)
        const result = await editPost(post)
        if(result.status===1){
            messageApi.open({
                type: 'success',
                content: result.message,
                duration: 1.3,
            });
            setPostEdit(false)
            setIsReset(Math.random())

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

    // console.log()
    // useEffect(() => {
    //     window.addEventListener('scroll', handleScroll);
    //     return () => {
    //         window.removeEventListener('scroll', handleScroll);
    //     };
    // }, [page]);
    const fetchData=async (load) =>{
            setLoading(true)
            let params = {user_id:userLogin.id};
            const respond = await getListPosts(params);
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

    useEffect(()=>{
           fetchData()
    },[isReset])
    // useEffect(() => {
    //     const handleScroll = () => {
    //
    //         if (
    //             document.documentElement.scrollHeight - window.innerHeight <=
    //             document.documentElement.scrollTop + 100 &&
    //             !loading
    //         ) {
    //
    //             const nextPage = page + 1;
    //             setPage(nextPage);
    //             console.log('Tăng page +1',page)
    //             if(page!==1) fetchData();
    //         }
    //     };
    //     const element = document.getElementById('list-posts');
    //     window.addEventListener('scroll', handleScroll);
    //     // Bắt sự kiện scroll của phần tử cụ thể
    //
    //
    //     // Hủy bỏ sự kiện khi component bị hủy
    //     return () => {
    //         element.removeEventListener('scroll', handleScroll);
    //     };
    // }, []);


    // useEffect(() => {
    //     const list = document.getElementById('list-posts');
    //
    //     if(list.clientHeight <= window.innerHeight && list.clientHeight) {
    //         setLoadMore(true);
    //         setPage(prev=>prev+1)
    //     }
    // }, [props.state]);

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
            {
                loading?(<ListSprintSkeleton />):(
                    <div className='gr-left'>

                        <div className='list-posts' id={'list-posts'}>
                            <div className='create-post'>
                                <AddPost  author={userLogin} onSave={handleCreatePost} />
                            </div>
                            {!!data && data.map(item => (
                                <PostItem post={item}
                                          onReset={setIsReset}
                                          onUpdate={handleOpenUpdatePost}
                                          onDelete={handleOpenConfirm}
                                />
                            ))}

                        </div>
                    </div>
                )
            }
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