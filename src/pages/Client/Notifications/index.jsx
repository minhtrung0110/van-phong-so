import React, {useState} from 'react';
import PropTypes from 'prop-types';
import './style.scss'
import {FaBell} from "react-icons/fa";
import NotificationItem from "~/components/Client/NotificationItems";
import {Tabs} from "antd";

NotificationsPage.propTypes = {};

function NotificationsPage(props) {
    const [type, setType] = useState('task')
    const listTypeNoti = [
        {id: 1, type: 'all', name_type: 'Chung',},
        {id: 2, type: 'task', name_type: 'Công Việc',},
        {id: 3, type: 'schedule', name_type: 'Lịch Biểu',},
    ]
    const listNotifications = [
        {
            id: 1,
            title: 'Họp Giao Ban Đầu Tuần',
            type: 'schedule',
            name_type: 'lịch biểu',
            description: 'Đi họp',
            thumbnail: 'https://upload.wikimedia.org/wikipedia/commons/9/96/USS_Enterprise_%28CVN-80%29_artist_depiction.jpg',
            url: 'http://   ',
            date: '29 tháng 12,2020',
            read:0,
        },
        {
            id: 2,
            title: 'Họp Giao Ban Đầu Tuần',
            type: 'schedule',
            name_type: 'lịch biểu',
            description: 'Đi họp',
            thumbnail: 'https://upload.wikimedia.org/wikipedia/commons/9/96/USS_Enterprise_%28CVN-80%29_artist_depiction.jpg',
            url: 'http://   ',
            date: '19 tháng 08,2021',
            read:1,
        }, {
            id: 3,
            title: 'Họp Giao Ban Đầu Tuần',
            type: 'schedule',
            name_type: 'lịch biểu',
            description: 'Đi họp',
            thumbnail: 'https://upload.wikimedia.org/wikipedia/commons/9/96/USS_Enterprise_%28CVN-80%29_artist_depiction.jpg',
            url: 'http://   ',
            date: '09 tháng 12,2021',
            read:0,
        }, {
            id: 4,
            title: 'Họp Giao Ban Đầu Tuần',
            type: 'schedule',
            name_type: 'lịch biểu',
            thumbnail: 'https://upload.wikimedia.org/wikipedia/commons/9/96/USS_Enterprise_%28CVN-80%29_artist_depiction.jpg',
            url: 'http://   ',
            date: '01 tháng 12,2022',
            read:0,
        }, {
            id: 5,
            title: 'Họp Giao Ban Đầu Tuần',
            type: 'task',
            name_type: 'công việc',
            thumbnail: 'https://upload.wikimedia.org/wikipedia/commons/9/96/USS_Enterprise_%28CVN-80%29_artist_depiction.jpg',
            url: 'http://   ',
            date: '19 tháng 02,2023',
            read:1,
        },

    ]
    return (
        <div className='container-notifications'>
            <div className='header-notifications'>
                <FaBell className='icon-bell'/>
                <h4 className='title'>Thông Báo</h4>
                <div className='num-notifications'>10</div>
            </div>
            <div className='filter-notifications'>

                <nav className="nav-fiter">
                    {listTypeNoti.map((item) => (
                        <span className={`tab-item ${type===item.type? 'active':''}`}
                              onClick={() => setType(item.type)}
                        >{item.name_type}</span>
                    ))}
                </nav>

            </div>
            <div className='list-notifications'>
                {
                    listNotifications.map((item) => {
                        if (type === 'all')
                            return (
                                <NotificationItem key={item.id} id={item.id} title={item.title} type={item.type}
                                                  description={item.description} thumbnail={item.thumbnail}
                                                  url={item.url} date={item.date} read={item.read}/>
                            )
                           else if(item.type === type)
                                return (
                                    <NotificationItem key={item.id} id={item.id} title={item.title} type={item.type}
                                                      description={item.description} thumbnail={item.thumbnail}
                                                      url={item.url} date={item.date} read={item.read}/>
                                )
                        }
                    )
                }
            </div>

        </div>
    );
}

export default NotificationsPage;