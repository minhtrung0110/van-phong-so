import React, {useRef, useState} from 'react';
import PropTypes from 'prop-types';
import {Checkbox, Switch} from "antd";
import {Controller} from "react-hook-form";

GroupPermission.propTypes = {

};

function GroupPermission({switchGroupState,setSwitchGroupSate,title}) {
    const keys=Object.keys(switchGroupState);
    const [selectAll, setSelectAll] = useState(false);
    const [switchStates, setSwitchStates] = useState(switchGroupState);

    const switchRefs = useRef(switchGroupState);

    const handleCheckAll = (e) => {
        setSelectAll(!selectAll);
        const result =keys.reduce((acc, key) => {
            acc[key] = !selectAll; // thay someValue bằng giá trị tương ứng
            return acc;
        }, {});
      //  setSwitchStates(result  )
        setSwitchGroupSate(result)

        // set giá trị cho tất cả các switch
        Object.values(switchRefs.current).forEach((ref) => {
            ref.checked =!selectAll;
        });
    };

    const handleSwitchChange = (checked, id) => {
        if(!!switchGroupState[keys[0]] && !!switchGroupState[keys[1]] && !!switchGroupState[keys[0]]) setSelectAll(false)
        setSwitchGroupSate({
            ...switchGroupState,
            [id]: checked,
        });
    };
    // console.log(keys[0])
    // console.log(switchRefs.current[keys[0]]);

    return (
        <div className={'group-permission'}>
            <span className='permission-title'>Nhóm quyền {title}</span>
            <div className='list'>
        <span className='list-title'>
          <Checkbox checked={selectAll} onChange={handleCheckAll}>
            {title}
          </Checkbox>
        </span>

                <span className='permission-item'>
          <Switch
              checked={switchGroupState[keys[0]]}
              onChange={(checked) => handleSwitchChange(checked, keys[0])}
            //  ref={(ref) => (switchRefs.current.delete = ref)}
          />
          <span className={'title'}>Thêm {title}</span>
        </span>
                <span className='permission-item'>
          <Switch
              checked={switchGroupState[keys[1]]}
              onChange={(checked) => handleSwitchChange(checked, keys[1])}

          />
          <span className={'title'}>Cập nhật {title}  </span>
        </span>
                <span className='permission-item'>
          <Switch
              checked={switchGroupState[keys[2]]}
              onChange={(checked) => handleSwitchChange(checked, keys[2])}

          />
          <span className={'title'}>Xóa {title}  </span>
        </span>
            </div>

        </div>
    );
}

export default GroupPermission;