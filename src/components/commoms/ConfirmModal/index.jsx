import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Button, Modal} from "antd";
import {FaExclamationTriangle} from "react-icons/fa";
import styles from "./ConfirmModal.module.scss"
import classNames from "classnames/bind";
ConfirmModal.propTypes = {
    
};
const cx = classNames.bind(styles)
function ConfirmModal({open=false,title,content,textCancel,textOK,onOK,onCancel}) {
    return (
        <Modal
            title={title}
            open={open}
            centered
            cancelText="Hủy"
            className={cx('confirm-modal')}
            onCancel={onCancel}
            onOk={onOK}
            footer={[

                <Button key="2"  className={cx('btn-cancel')} onClick={onCancel}>{textCancel}</Button>,
                <Button key="3" className={cx('btn-confirm')} type="primary" danger onClick={onOK}>
                    {textOK}
                </Button>
            ]}
        >
            <div className={cx("box-confirmation")}>
                <FaExclamationTriangle className={cx('icon')}/>
                <span className={cx("content")} >{content}</span>
            </div>
        </Modal>
    );
}

export default ConfirmModal;