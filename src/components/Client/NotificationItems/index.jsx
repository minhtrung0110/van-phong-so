import React from 'react';
import PropTypes from 'prop-types';
import './style.scss'
NotificationItem.propTypes = {
    
};

function NotificationItem({id, title,type,description,thumbnail,date,url}) {
    return (
        <a className='notification-item'href={url}>
            <div className='notification-header'>
                <img src={thumbnail} alt={title} className='img-thumbnail'/>
            </div>
            <div className='notification-content'>
                <div className='notification-title'>{title}</div>
                <span className='notification-description'>{description}</span>
                <span className='notification-date'>{date}</span>
            </div>
        </a>
    );
}

export default NotificationItem;