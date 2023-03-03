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

function SearchSelectModal({open, onClose, onSubmit, title, listOptions = [], placeholder, top = '10rem'}) {
    const [value, setValue] = useState([]);
    const options = listOptions.map((d) => ({
        value: d.id,
        label: `${d.first_name} ${d.last_name}`,
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
        onChange: (newValue) => {
            setValue(newValue);
        },
        placeholder: 'Chọn thành viên...',
        maxTagCount: 'responsive',
    };
    const handleOnClose = () => {
        const listMemberChosen = value.map((id) => {
            const item = listMembersForTask.find((member) => id === member.id)
            if (!isEmpty(item)) return item;
        })
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