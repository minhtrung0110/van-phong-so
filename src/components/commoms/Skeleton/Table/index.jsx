import React from 'react';
import PropTypes from 'prop-types';
import {Skeleton} from "antd";
import styles from './TableSkeleton.module.scss'
import classNames from "classnames/bind";
TableSkeleton.propTypes = {

};
const cx=classNames.bind(styles)
function TableSkeleton({column,lengthItem=5}) {
    return (
        <table className={cx('table-skeleton')} >
            <thead className={cx('tb-header')}>
            <tr className={cx('tr-header')}>
                {Array.from({ length: column }).map((_, index) => (
                    <th key={index} className={cx('th-header')}>
                        <Skeleton.Input active={true} className={cx('header-item')} size={'default'} />
                    </th>
                ))}
            </tr>
            </thead>
            <tbody className={cx('tb-body')}>
            {Array.from({ length: lengthItem }).map((_, index) => (
                <tr key={index} className={cx('tr-row')}>
                    {Array.from({ length: column }).map((_, index) => (
                        <td key={index} className={cx('td-item')}>
                            <Skeleton.Input active={true} size={'default'} />
                        </td>
                    ))}
                </tr>
            ))}
            </tbody>
        </table>
    );
}

export default TableSkeleton;