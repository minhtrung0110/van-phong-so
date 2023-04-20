import {config} from "~/config";
import SelectHeaderProject from "~/components/commoms/SelectHeaderProject";


export  const dataConvertBreadcrumbLanguage=[
    {href:config.routes.overview,label:'Tổng Quan'},
    {href:config.routes.project,label:(<SelectHeaderProject/>)},
    {href:config.routes.schedule,label:'Lịch Biểu'},
    {href:config.routes.meeting,label:'Cuộc Họp'},
    {href:config.routes.staff,label:'Nhân Sự'},
    {href:config.routes.profile,label:'Thông Tin Cá Nhân'},
    {href:config.routes.notification,label:'Thông Báo'},
    {href:config.routes.department,label:'Phòng Ban'},
    {href:config.routes.changePassword,label:'Đổi Mật Khẩu'},
    {href:config.routes.config,label:'Cấu Hình'},
    {href:config.routes.backlog,label:'Danh Sách Công Việc'},
    {href:config.routes.allProject,label:(<SelectHeaderProject/>)},
    {href:config.routes.decentralize,label:'Cấu Hình Phân Quyền'},
    {href:config.routes.post,label:'Bảng Tin'},
    {href:config.routes.home,label:'Bài Viết'},
    {href:config.routes.setting,label:'Thông Tin Tổ Chức'},
    {href:config.routes.group,label:'Nhóm'},

]
