import React from 'react';
import PropTypes from 'prop-types';
import {Skeleton} from "antd";
import TableSkeleton from "~/components/commoms/Skeleton/Table";
import styles from "./ListSprint.module.scss"
import classNames from "classnames/bind";
ListSprintSkeleton.propTypes = {

};
const cx=classNames.bind(styles)
function ListSprintSkeleton(props) {
    return (
        <div className={cx('page-list-sprint')}>
            <div className={cx('title')}>
                <Skeleton.Input active={true} size={'small'} className={cx('text')} />
            </div>
            <div className={cx('header')}>
                <div className={cx('filter')}>
                    <Skeleton.Input active={true} size={'default'} />
                    <Skeleton.Input active={true} size={'default'} />
                </div>
                <div className={cx('search')}>
                    <Skeleton.Input active={true} size={'default'} />
                    <Skeleton.Button active={true} size={'default'} />
                    <Skeleton.Button active={true} size={'default'} />
                </div>
            </div>
            <div className={cx('content')}>
                <div className={cx('list-sprint')}>
                    <Skeleton.Input active={true} className={cx('sprint-item')} size={'default'} />
                    <Skeleton.Input active={true} className={cx('sprint-item')} size={'default'} />
                    <Skeleton.Input active={true} className={cx('sprint-item')} size={'default'} />
                    <Skeleton.Input active={true} className={cx('sprint-item')} size={'default'} />
                    <Skeleton.Input active={true} className={cx('sprint-item')} size={'default'} />
                </div>
            </div>
            <div className={cx('footer')}>
            </div>
        </div>
    );
}

export default ListSprintSkeleton;