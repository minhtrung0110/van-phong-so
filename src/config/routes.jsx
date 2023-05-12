import React from 'react'
import {forgotPassword} from "~/api/Client/Auth";

const routes = {
    home:"/",
    login:"/login",
    forgotPassword:'/forgot-password',
    setting:"/setting",
    post:'/posts',
    project:"/project",
    profile:"/@:nickname",
    meeting:"/meeting",
    staff:"/staff",
    schedule:"/schedule",
    notification:"/notification",
    department:"/department",
    group:"/department/group",
    changePassword:"/change-password",
    logout:"/logout",
    config:'/config',
    backlog:'/project/backlog',
    allProject:'/project/all',
    decentralize:'/decentralize',


}

export default routes