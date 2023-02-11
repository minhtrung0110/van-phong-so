import React, {useState} from 'react';
import PropTypes from 'prop-types';
import './style.scss'
import {Col, Row, Tabs} from "antd";
import AutoSendMail from "~/components/commoms/AutoSendMail";
import AutoCallPhone from "~/components/commoms/AutoCallPhone";
import {FaBirthdayCake, FaChair, FaFemale, FaHome, FaMailBulk, FaMap, FaPhone, FaUser} from "react-icons/fa";
DetailStaff.propTypes = {

};
const contentPrevie=(key) =>(
    <div className="content" key={key}>
        25+5={key}
    </div>
)
function DetailStaff( {user}) {
    console.log(user)
    const [size, setSize] = useState('small');
    const onChange = (e) => {
        setSize(e.target.value);
    };
    return (
        <Row className='box-detail-staff' >

                <Col className='box-info-basic box' xs={{ span: 24, offset: 1 }} lg={{ span: 8, offset: 1 }}>
                    <img className='img' src={user.avatar} />
                    <div className='container-info-basic'>
                        <div className='item-info'>
                            <FaUser  className='icon-info-staff' />
                            <h4 className='content'>{` ${user.first_name} ${user.last_name}`}</h4>
                        </div>
                        <div className='item-info'>
                            <FaChair className='icon-info-staff' />
                            <span className='content'>{user.role}</span>
                        </div>
                        <div className='item-info'>
                          <FaMailBulk  className='icon-info-staff' />
                            <span className='content c-pointer'><AutoSendMail email={user.mail} /></span>
                        </div>
                        <div className='item-info'>
                            <FaPhone  className='icon-info-staff' />
                            <span className='content c-pointer'><AutoCallPhone phoneNumber={user.phone_number} /></span>
                        </div>
                        <div className='item-info'>
                           <FaFemale className='icon-info-staff' />
                            <span className='content'>{user.gender}</span>
                        </div>
                        <div className='item-info'>
                            <FaBirthdayCake  className='icon-info-staff' />
                            <span className='content'>{user.birth_date}</span>
                        </div>
                        <div className='item-info'>
                            <FaMap  className='icon-info-staff' />
                            <span className='content fst-ital'>{user.address}</span>
                        </div>
                    </div>
                </Col >

                <Col className='box-info box' xs={{ span: 24, offset: 1 }} lg={{ span: 15, offset: 1 }}>
                    <Tabs
                        onChange={onChange}
                        type="card"
                        items={new Array(3).fill(null).map((_, i) => {
                            const id = String(i + 1);
                            return {
                                label: `Tab ${id}`,
                                key: id,
                                children: contentPrevie(id),
                            };
                        })}
                    />


                </Col>
            </Row>

    );
}

export default DetailStaff;