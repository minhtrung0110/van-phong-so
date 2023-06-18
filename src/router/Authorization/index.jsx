import React from 'react';
import {useNavigate} from 'react-router-dom';
import {useSelector} from "react-redux";
import {getUserSelector} from "~/redux/selectors/auth/authSelector";
import {config} from "~/config";

// HOC để xác thực quyền truy cập
const withAuthorization = (allowedRoles) => (WrappedComponent) => {
    const navigation=useNavigate()
    return (props) => {
        // Kiểm tra quyền của người dùng ở đây (có thể từ Redux Store hoặc Context API)
        const userRoles = useSelector(getUserSelector); // Giả sử người dùng có vai trò là 'admin'
       // const listPermissions =userRoles.permission.map(item =>item.permission[])
        const viewPermissions = userRoles.permission
            .filter(item => Object.keys(item.permission).some(key => key.includes('view') && item.permission[key] === true))
            .map(item => item.name);
        console.log(viewPermissions)
        // Kiểm tra xem người dùng có quyền truy cập không
        const hasAccess = viewPermissions.some(role => allowedRoles.includes(role));

        if (hasAccess) {
            // Người dùng có quyền truy cập, hiển thị component trang
            return <WrappedComponent {...props} />;
        } else {
            // Người dùng không có quyền truy cập, chuyển hướng hoặc hiển thị thông báo lỗi
            return navigation(config.routes.home);
        }
    };
};

export default withAuthorization;
