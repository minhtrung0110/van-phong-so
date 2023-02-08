import React from 'react';
import PropTypes from 'prop-types';
import  './style.scss'
import {FaBell} from "react-icons/fa";
import NotificationItem from "~/components/Client/NotificationItems";
NotificationsPage.propTypes = {

};

function NotificationsPage(props) {
    const listNotifications =[
        {
            id:1,
            title: 'Họp Giao Ban Đầu Tuần',
            type:'lịch biểu',
            description: 'Đi họp',
            thumbnail:'https://upload.wikimedia.org/wikipedia/commons/9/96/USS_Enterprise_%28CVN-80%29_artist_depiction.jpg',
            url: 'http://   ',
            date: '29 tháng 12,2020'
        },
        {
            id:2,
            title: 'Họp Giao Ban Đầu Tuần',
            type:'lịch biểu',
            description: 'Đi họp',
            thumbnail:'https://upload.wikimedia.org/wikipedia/commons/9/96/USS_Enterprise_%28CVN-80%29_artist_depiction.jpg',
            url: 'http://   ',
            date: '19 tháng 08,2021'
        },{
            id:3,
            title: 'Họp Giao Ban Đầu Tuần',
            type:'lịch biểu',
            description: 'Đi họp',
            thumbnail:'https://upload.wikimedia.org/wikipedia/commons/9/96/USS_Enterprise_%28CVN-80%29_artist_depiction.jpg',
            url: 'http://   ',
            date: '09 tháng 12,2021'
        },{
            id:4,
            title: 'Họp Giao Ban Đầu Tuần',
            type:'lịch biểu',
            description: 'Đi họp',
            thumbnail:'https://upload.wikimedia.org/wikipedia/commons/9/96/USS_Enterprise_%28CVN-80%29_artist_depiction.jpg',
            url: 'http://   ',
            date: '01 tháng 12,2022'
        },{
            id:5,
            title: 'Họp Giao Ban Đầu Tuần',
            type:'lịch biểu',
            description: 'Đi họp',
            thumbnail:'https://upload.wikimedia.org/wikipedia/commons/9/96/USS_Enterprise_%28CVN-80%29_artist_depiction.jpg',
            url: 'http://   ',
            date: '19 tháng 02,2023'
        },

    ]
    return (
        <div className='container-notifications'>
            <div className='header-notifications'>
                <FaBell className='icon-bell'/>
                <h4 className='title'>Thông Báo</h4>
            </div>
            <div className='list-notifications'>
                {
                    listNotifications.map((item)=>(
                        <NotificationItem key={item.id} id={item.id} title={item.title} type={item.type}
                        description={item.description} thumbnail={item.thumbnail} url={item.url} date={item.date } />
                    ))
                }
            </div>
        </div>
    );
}

export default NotificationsPage;