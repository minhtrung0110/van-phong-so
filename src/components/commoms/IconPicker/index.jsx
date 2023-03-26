import React, { useState } from 'react';

import {FcDepartment} from "react-icons/fc";
import {iconProject} from "~/asset/images/img_icon_project";
import ImageCustom from "~/components/commoms/Image";
import {Select} from "antd";

const IconPicker = () => {
    const [selectedIcon, setSelectedIcon] = useState(<FcDepartment/>);
    const listIcon=[
        {
            value: '1',
            label: (<ImageCustom src={iconProject.icon1} />) ,
        },
    ]
    const handleIconClick = (icon) => {
        setSelectedIcon(icon);
    }

    return (
        <Select
            style={{
                width: 120,
            }}
           // onChange={handleChange}
            options={listIcon}
        />
    );
}

export default IconPicker;
