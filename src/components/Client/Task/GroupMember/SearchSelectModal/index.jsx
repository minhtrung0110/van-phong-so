import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Button, Modal, Select} from "antd";
import {FaExclamationTriangle} from "react-icons/fa";
import styles from "./SearchSelect.module.scss"
import classNames from "classnames/bind";
import {listMembersForTask} from "~/asset/data/initalDataTask";
import {isEmpty} from "lodash";

SearchSelectModal.propTypes = {};
const cx = classNames.bind(styles)

function SearchSelectModal({open, onClose, onSubmit,selectLimit=10, title, listOptions = [],type, placeholder, top = '10rem'}) {
    const [value, setValue] = useState([]);
    const options = listOptions.map((d) => ({
        value: d.email,
        label: type!=='event'?`${d.first_name} ${d.last_name}`:d.full_name,
    }))
    // calll API get Staff List

    //
    const selectProps = {
        mode: 'multiple',
        style: {
            width: '100%',
        },
        value,
        options,
        defaultActiveFirstOption:true,
        onChange: (newValue) => {
            if (newValue?.length > selectLimit) {
                // if you want only one element :).
                newValue.pop();
            }
            setValue(newValue);
        },
        placeholder: 'Chọn thành viên...',
        maxTagCount: 'responsive',
    };
    const handleOnClose = () => {
        const listMemberChosen = value.map((id) => {
            console.log('id', id)
            const item = listOptions.find((member) => id === member.email);
            if (!isEmpty(item)) return item;
        })
        console.log('member dc cchon',listMemberChosen)
        onSubmit(listMemberChosen);
        onClose(false)
    }
    return (
        <Modal
            title={title}
            open={open}
            style={{
                top: top,
                width: 320,
            }}
            cancelText="Hủy"
            className={cx('search-select-modal')}
            onCancel={handleOnClose}
            footer={null}
        >
            <div className={cx("box-search-select")}>
                <Select {...selectProps} size='middle'/>
            </div>
        </Modal>
    );
}

export default SearchSelectModal;