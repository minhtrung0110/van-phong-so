import React from 'react';
import PropTypes from 'prop-types';
import styles from './SidebarSkeleton.module.scss'
import classNames from "classnames/bind";
import {Skeleton} from "antd";

SidebarSkeleton.propTypes = {};
const cx = classNames.bind(styles)

function SidebarSkeleton({collapsed}) {
    return (
        <div className={cx('sidebar-skeleton')}>
            {!!collapsed ? (
                <>
                    <div className={cx('group')}>
                        <Skeleton.Button className={cx('menu-item')} active={true} size={'default'}/>
                        <Skeleton.Button className={cx('menu-item')} active={true} size={'default'}/>
                        <Skeleton.Button className={cx('menu-item')} active={true} size={'default'}/>
                        <Skeleton.Button className={cx('menu-item')} active={true} size={'default'}/>
                        <Skeleton.Button className={cx('menu-item')} active={true} size={'default'}/>
                    </div>
                    <div className={cx('group')}>
                        <Skeleton.Button className={cx('menu-item')} active={true} size={'default'}/>
                        <Skeleton.Button className={cx('menu-item')} active={true} size={'default'}/>
                        <Skeleton.Button className={cx('menu-item')} active={true} size={'default'}/>
                        <Skeleton.Button className={cx('menu-item')} active={true} size={'default'}/>
                    </div>
                </>
            ) : (
                <>
                    <div className={cx('group')}>
                        <Skeleton.Input className={cx('menu-item')} active={true} size={'default'}/>
                        <Skeleton.Input className={cx('menu-item')} active={true} size={'default'}/>
                        <Skeleton.Input className={cx('menu-item')} active={true} size={'default'}/>
                        <Skeleton.Input className={cx('menu-item')} active={true} size={'default'}/>
                        <Skeleton.Input className={cx('menu-item')} active={true} size={'default'}/>
                    </div>
                    <div className={cx('group')}>
                        <Skeleton.Input className={cx('menu-item')} active={true} size={'default'}/>
                        <Skeleton.Input className={cx('menu-item')} active={true} size={'default'}/>
                        <Skeleton.Input className={cx('menu-item')} active={true} size={'default'}/>
                        <Skeleton.Input className={cx('menu-item')} active={true} size={'default'}/>
                    </div>
                </>
            )}


        </div>
    );
}

export default SidebarSkeleton;