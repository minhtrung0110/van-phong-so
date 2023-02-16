import React from 'react';
import PropTypes from 'prop-types';
import {Form, InputGroup} from 'react-bootstrap'

ManageSchedule.propTypes = {

};

function ManageSchedule(props) {
    return (
        <div>
            <InputGroup className="mb-3">
                <Form.Control
                    placeholder="Recipient's username"
                    aria-label="Recipient's username"
                    aria-describedby="basic-addon2"
                />
                <InputGroup.Text id="basic-addon2">@example.com</InputGroup.Text>
            </InputGroup>

        </div>
    );
}

export default ManageSchedule;