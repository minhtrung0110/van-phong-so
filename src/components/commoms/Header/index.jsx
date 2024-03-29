import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import { FaBars,} from "react-icons/fa";
import classNames from "classnames/bind";
import InfoUser from "~/components/commoms/InfoUser";
import {Skeleton} from "antd";
import './Header.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {isCollapseSideBar} from "~/redux/selectors/dashboard/dashboardSelector";
import {setCollapseSideBar} from "~/redux/reducer/dashboard/dashboardReducer";
import {useLocation, useNavigate} from "react-router-dom";
import {dataConvertBreadcrumbLanguage} from "~/asset/data/data-convert-breadcrumb-language";
import styles from './Header.module.scss'
import ConfirmModal from "~/components/commoms/ConfirmModal";
import {setUser, setExpiredToken, setIsLogin} from "~/redux/reducer/auth/authReducer";
import {deleteCookie, getCookies, handleGetUserInformation} from "~/api/Client/Auth";
import {config} from "~/config";

HeaderBar.propTypes = {};

const cx = classNames.bind(styles)

function HeaderBar({onCollapse}) {
    const [userLogin,setUserLogin]=useState({})
    const isCollapsed = useSelector(isCollapseSideBar)
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate=useNavigate()
    const [loading,setLoading]=useState(false)
    const [showConfirmLogout,setShowConfirmLogout] =useState(false)
    const handleSwitchMode = (e) => {
        if (e.target.checked) {
            document.body.classList.add("dark");
        } else {
            document.body.classList.remove("dark");
        }
    }
    const handleLogout = () => {
        dispatch(setExpiredToken(true));
        const token = getCookies('vps_token');
        dispatch(setIsLogin(false));
        dispatch(setExpiredToken(true));
        if (token) {
            deleteCookie('vps_token');
        }
        setShowConfirmLogout(false)
        navigate(config.routes.login)
    };
//Handle Logic
    const handleSetUnthorization = () => {
        dispatch(setExpiredToken(true));
        const token = getCookies('vps_token');
        if (token) {
            deleteCookie('vps_token');
        }
    };
    useEffect(()=>{
        async function fetchData(){
            setLoading(true)
            const result=await handleGetUserInformation()
            if (result===401) {
                handleSetUnthorization();
                return false;
            }
            else {
                setUserLogin(result);
                dispatch(setUser(result));
                setLoading(false);
            }
        }
        fetchData()

    },[location.pathname])

    return (
        <>
            <nav className={cx('navbar')}>
                <div className={cx('box-info-context')}>
                    <FaBars className={cx('bx-menu')} onClick={() => dispatch(setCollapseSideBar(!isCollapsed))}/>
                    <span className={cx("nav-link")}>{
                        dataConvertBreadcrumbLanguage.find((item) => (item.href === location.pathname)).label
                    }</span>
                   {/*<SelectHeaderProject/>*/}
                </div>
                {/*<SearchCustom/>*/}

                <div className={cx('box-config')}>
                    <input type="checkbox" id="switch-mode" hidden onChange={(e) => handleSwitchMode(e)}/>
                    <label htmlFor="switch-mode" className={cx("switch-mode")}></label>
                    {/*<DropdownNotify/>*/}

                    {
                        loading ? (
                            <Skeleton.Avatar active={true} size={'large'}  />
                        ):(
                            <InfoUser user={userLogin}
                                      onLogout={setShowConfirmLogout}
                            />
                        )
                    }
                </div>


            </nav>
            <ConfirmModal title="Đăng Xuất Khỏi Hệ Thống"
                          open={showConfirmLogout}
                          content={<div dangerouslySetInnerHTML={{__html: `Bạn Có Chắc Chắn Muốn Đăng Xuất ? `}} />}
                          textOK="Đăng Xuất "
                          textCancel="Hủy"
                          onOK={() => handleLogout()}
                          onCancel={(e) => setShowConfirmLogout(false)}/>
        </>
    );
}

export default HeaderBar;